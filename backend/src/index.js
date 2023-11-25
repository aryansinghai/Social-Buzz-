const apiFn = require('./api');
const socketFn = require('./socket');

const main = async () => {
  try {
    await apiFn();
    await socketFn();
  } catch (error) {
    console.error('❌ Error Starting Server: %s', error);
  }
};

main().catch(console.error);
