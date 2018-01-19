'use strict';

const os = require('os');

module.exports = () => {
  return {
    hostname: os.hostname(),
    architecture: {
      arch: os.arch(),
      platform: os.platform(),
      release: os.release(),
      type: os.type()
    },
    resources: {
      cpus: os.cpus(),
      totalmem: os.totalmem(),
      freemem: os.freemem()
    }
  };
};