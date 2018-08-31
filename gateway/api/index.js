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

const index = new echoProto.EchoService('127.0.0.1:50051', grpc.credentials.createInsecure());

index.echo({
  message: 'test',
}, (error, message) => {
  if (error) {
    console.log('Error: ', error);
  } else {
    console.log(message);
  }
});
