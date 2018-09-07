const ProtoRpc = require('colony-proto');

function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  }

  if (n > 30) {
    return fibonacci(30);
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

const run = async () => {
  try {
    await ProtoRpc.initServices('../root.proto');
    await ProtoRpc.implement('fibonacci.Fibonacci.Calculate', (data) => {
      const n = Math.min(30, data.number);

      console.log(' [.] fib(%d)', n);

      const fib = fibonacci(n);

      return {
        fib,
      };
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

run();
