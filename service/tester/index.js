const ProtoRpc = require('colony-proto');

const run = async () => {
  try {
    const root = await ProtoRpc.initServices('../root.proto');

    while (true) {
      const number = Math.round(Math.random() * 30);

      console.log(' [x] Requesting fib(%d)', number);
      let reply = await root.fibonacci.Fibonacci.calculate({ number });
      console.log(' [.] Got %s', reply.fib);

      let b = Math.round(Math.random() * 1000);
      const e = Math.round(Math.random() * 10);
      console.log(' [x] Requesting power(%d, %d)', b, e);
      reply = await root.math.power.Power.calculate({ b, e });
      console.log(' [.] Got %s', reply.pow);

      const a = Math.round(Math.random() * 100000);
      b = Math.round(Math.random() * 100000);
      console.log(' [x] Requesting sum(%d, %d)', a, b);
      reply = await root.math.sum.Sum.calculate({ a, b });
      console.log(' [.] Got %s', reply.sum);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
};

run();
