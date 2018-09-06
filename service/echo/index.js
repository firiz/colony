const amqp = require('amqplib');

function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

const run = async () => {
  try {
    const conn = await amqp.connect('amqp://localhost');
    const ch = await conn.createChannel();
    const q = 'rpc_queue';

    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    ch.consume(q, (msg) => {
      const n = parseInt(msg.content.toString(), 10);

      console.log(' [.] fib(%d)', n);

      const r = fibonacci(n);

      ch.sendToQueue(msg.properties.replyTo,
        Buffer.from(r.toString()),
        { correlationId: msg.properties.correlationId });

      ch.ack(msg);
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

run();
