const protobuf = require('protobufjs');
const RabbitRpc = require('colony-rpc');
const flatten = require('flat');

const client = new RabbitRpc();
let root;

class Proto {
  static _findPath(target) {
    if (!target.parent) {
      return '';
    }

    const parentPath = Proto._findPath(target.parent);

    if (parentPath === '') {
      return `${target.name}`;
    }

    return `${parentPath}.${target.name}`;
  }

  static async _rpc(method, requestData, callback) {
    const queueName = Proto._findPath(method);
    const reply = await client.call(queueName, requestData);
    callback(undefined, reply);
  }

  static async initServices(protoPath) {
    await client.init();
    root = await protobuf.load(protoPath);

    const services = {};

    const servicePaths = Object
      .keys(flatten(root.toJSON()))
      .filter(k => k.includes('methods.'))
      .map(k => k
        .split('nested.')
        .join('')
        .replace('methods.', '')
        .split('.')
        .slice(0, -2)
        .join('.'))
      .filter((k, pos, array) => array.indexOf(k) === pos);

    for (const servicePath of servicePaths) {
      const service = root.lookup(servicePath);
      if (service) {
        const servicePathSplit = servicePath.split('.');
        let index = services;
        for (let i = 0; i < servicePathSplit.length - 1; i += 1) {
          index[servicePathSplit[i]] = index[servicePathSplit[i]] || {};
          index = index[servicePathSplit[i]];
        }
        index[servicePathSplit[servicePathSplit.length - 1]] =
          service.create(Proto._rpc, false, false);
      }
    }

    return services;
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
