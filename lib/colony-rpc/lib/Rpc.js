class Rpc {
  async init() {
    console.log(this);
    throw new Error('Not Implemented!');
  }

  addHandler(queueName, handler) {
    console.log(this, queueName, handler);
    throw new Error('Not Implemented!');
  }

  async call(queueName, data) {
    console.log(this, queueName, data);
    throw new Error('Not Implemented!');
  }
}

module.exports = Rpc;
