const ProtoRpc = require('colony-proto');

const run = async () => {
  try {
    const services = await ProtoRpc.initServices('../root.proto');

    while (true) {
      const number = Math.round(Math.random() * 30);

      console.log(' [x] Requesting fib(%d)', number);

      const reply = await services.fibonacci.calculate({ number });

      console.log(' [.] Got %s', reply.number);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
};

run();
