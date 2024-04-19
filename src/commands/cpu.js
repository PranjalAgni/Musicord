const os = require('os');

const handler = (message) => {
  const cpuList = os.cpus();
  const defaultCpu = cpuList.at(0);
  const cpuArch = os.arch();
  message.channel.send(`CPU model is: ${defaultCpu.model} and architecture is ${cpuArch}`);
};

module.exports = {
  name: 'cpu',
  description: 'Tells about CPU info',
  execute: handler,
};
