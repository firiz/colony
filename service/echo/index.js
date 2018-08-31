const grpc = require('grpc');

const echoProto = grpc.load('../../proto/service/echo.proto');

const server = new grpc.Server();

server.addService(echoProto.colony.EchoService.service, {
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
