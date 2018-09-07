const RabbitRpc = require('colony-rpc/rabbit');

const client = new RabbitRpc();

const run = async () => {
  try {
    await client.init();

    while (true) {
      const num = Math.round(Math.random() * 30);

      console.log(' [x] Requesting fib(%d)', num);

      const result = await client.call('fibonacci.calculate', num);

      console.log(' [.] Got %s', result.toString());
    }
  } catch (error) {
    console.log('Error: ', error);
  }
};

run();
