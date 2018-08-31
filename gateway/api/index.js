const PROTO_PATH = `${__dirname}/../../proto/service/echo.proto`;

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const bluebird = require('bluebird');

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

const client = new echoProto.EchoService('127.0.0.1:50051', grpc.credentials.createInsecure());
bluebird.promisifyAll(client);

const run = async () => {
  try {
    const echoMessage = {
      message: 'test',
    };

    const result = await client.echoAsync(echoMessage);
    console.log(result);
  } catch (error) {
    console.log('Error: ', error);
  }
};

run();
