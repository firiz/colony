const PROTO_PATH = `${__dirname}/../../proto/service/echo.proto`;
const HOST = '127.0.0.1';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const getPort = require('get-port');
const consul = require('consul')({ promisify: true });

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);

const echoProto = grpc.loadPackageDefinition(packageDefinition).colony;

const server = new grpc.Server();

server.addService(echoProto.EchoService.service, {
  echo(call, callback) {
    const echo = {
      message: call.request.message,
    };
    callback(null, echo);
  },
});

const run = async () => {
  try {
    const port = await getPort();
    server.bind(`${HOST}:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    await consul.agent.service.register({
      name: 'echo',
      address: HOST,
      port,
      tags: ['service', 'echo'],
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

run();
