const protobuf = require('protobufjs');
const RabbitRpc = require('colony-rpc');

const client = new RabbitRpc();
let root;

class Proto {
  static async rpc(method, requestData, callback) {
    const queueName = `${method.parent.name}.${method.name}`;
    const reply = await client.call(queueName, requestData);
    callback(undefined, reply);
  }

  static async initServices(protoPath) {
    await client.init();
    root = await protobuf.load(protoPath);

    const Fibonacci = root.lookup('Fibonacci');
    const fibonacci = Fibonacci.create(this.rpc, false, false);
    return {
      fibonacci,
    };
  }

  static async implement(method, implementation) {
    const methodProto = root.lookup(method);
    const requestProto = methodProto.resolvedRequestType;
    const responseProto = methodProto.resolvedResponseType;
    client.addHandler(method, async (data) => {
      const requestData = (data && requestProto) ? requestProto.decode(data) : undefined;
      const responeData = await implementation(requestData);
      const replyData = (responeData && responseProto)
        ? responseProto.encode(responeData).finish() : undefined;
      return replyData;
    });
  }
}

module.exports = Proto;
