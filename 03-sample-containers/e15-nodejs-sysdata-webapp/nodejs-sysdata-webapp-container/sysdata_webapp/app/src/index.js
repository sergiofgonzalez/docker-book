'use strict';

const http = require('http');
const systemData = require('./lib/system-data');
const zeptolog = require('./lib/zeptolog');
const config = require('./lib/config');

const logger = zeptolog(config('LOGGER:LEVEL'));


const controller = (req, res) => {
  logger.debug(`Received request from ${ req.connection.remoteAddress }`);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(systemData()));
};

const server = http.createServer(controller);
server.listen(config('SERVER:PORT'));
server.on('listening', () => logger.debug(`HTTP server listening on ${ config('SERVER:PORT') }`));