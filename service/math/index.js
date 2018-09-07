const ProtoRpc = require('colony-proto');

const run = async () => {
  try {
    await ProtoRpc.initServices('../root.proto');
    await ProtoRpc.implement('math.power.Power.Calculate', (data) => {
      const { b, e } = data;

      console.log(' [.] pow(%d, %d)', b, e);

      const pow = Math.pow(b, e);

      return {
        pow,
      };
    });
    await ProtoRpc.implement('math.sum.Sum.Calculate', (data) => {
      const { a, b } = data;

      console.log(' [.] sum(%d, %d)', a, b);

      const sum = a + b;

      return {
        sum,
      };
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

run();
