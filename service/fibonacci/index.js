const RabbitRpc = require('colony-rpc');

const client = new RabbitRpc();

function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

const run = async () => {
  try {
    await client.init();

    client.addHandler('fibonacci.calculate', (data) => {
      const n = Math.min(30, parseInt(data.toString(), 10));

      console.log(' [.] fib(%d)', n);

      const r = fibonacci(n);

      return r;
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

run();
