const PROTO_PATH = `${__dirname}/../../proto/service/echo.proto`;

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const bluebird = require('bluebird');
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

const run = async () => {
  try {
    const services = await consul.agent.service.list();
    const client = new echoProto.EchoService(`${services.echo.Address}:${services.echo.Port}`, grpc.credentials.createInsecure());
    bluebird.promisifyAll(client);

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
