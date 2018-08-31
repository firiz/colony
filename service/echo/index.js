const PROTO_PATH = `${__dirname}/../../proto/service/echo.proto`;

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

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

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://0.0.0.0:50051');
server.start();
