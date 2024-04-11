const os = require('os');

const handler = (message) => {
  const cpuList = os.cpus();
  const defaultCpu = cpuList.at(0);
  message.channel.send(`Model is: ${defaultCpu.model}`);
};

module.exports = {
  name: 'cpu',
  description: 'Tells about CPU info',
  execute: handler,
};
