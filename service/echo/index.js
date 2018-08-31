const PROTO_PATH = `${__dirname}/../../proto/service/echo.proto`;
const HOST = '0.0.0.0';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const getPort = require('get-port');

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
    console.log(`Server running at http://${HOST}:${port}`);
    server.start();
  } catch (error) {
    console.log('Error: ', error);
  }
};

run();
