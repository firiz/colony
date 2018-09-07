const Promise = require('bluebird');
const amqp = require('amqplib');
const Rpc = require('./Rpc');

class RabbitRpc extends Rpc {
  constructor() {
    super();
    this.responseHandlers = new Map();
  }

  static _generateUuid() {
    return Math.random().toString()
      + Math.random().toString()
      + Math.random().toString();
  }

  _responseHandler(msg) {
    const resolve = this.responseHandlers.get(msg.properties.correlationId);
    if (resolve) {
      resolve(msg.content);
      this.responseHandlers.delete(msg.properties.correlationId);
    }
  }

  async init() {
    this.conn = await amqp.connect('amqp://localhost');
    this.ch = await this.conn.createChannel();
    this.ch.prefetch(5);
    this.resQueue = await this.ch.assertQueue('', { exclusive: true });
    this.ch.consume(this.resQueue.queue, (msg) => {
      this._responseHandler(msg);
    }, { noAck: true });
  }

  addHandler(queueName, handler) {
    this.ch.assertQueue(queueName, { durable: false });
    console.log(' [x] Awaiting RPC requests');

    this.ch.consume(queueName, async (msg) => {
      const result = await handler(msg.content);

      this.ch.sendToQueue(msg.properties.replyTo,
        result,
        { correlationId: msg.properties.correlationId });

      this.ch.ack(msg);
    });
  }

  async call(queueName, data) {
    const correlationId = RabbitRpc._generateUuid();

    const promise = new Promise((resolve) => {
      this.responseHandlers.set(correlationId, resolve);
    });

    this.ch.sendToQueue(queueName,
      data,
      { correlationId, replyTo: this.resQueue.queue });

    return promise;
  }
}

module.exports = RabbitRpc;
