const grpc = require('grpc');

const echoProto = grpc.load('../../proto/service/echo.proto');

const index = new echoProto.colony.EchoService('127.0.0.1:50051', grpc.credentials.createInsecure());

index.echo({
  message: 'test',
}, (error, message) => {
  if (error) {
    console.log('Error: ', error);
  } else {
    console.log(message);
  }
});
