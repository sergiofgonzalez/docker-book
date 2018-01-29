'use strict';

const http = require('http');
const systemData = require('./lib/system-data');
const zeptolog = require('./lib/zeptolog');
const config = require('./lib/config');

const logger = zeptolog(config('LOGGER:LEVEL'));

let numRequests = 0;

const controller = (req, res) => {
  logger.debug(`Received request from ${ req.connection.remoteAddress }: request # ${ ++numRequests }`);

  if (numRequests >= 5) {
    logger.debug(`Sending HTTP status code 500 as a response: request # ${ ++numRequests }`);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Artificial error sent on request # ${ numRequests }`);
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(systemData()));    
  }
};

const server = http.createServer(controller);
server.listen(config('SERVER:PORT'));
server.on('listening', () => {
  logger.debug(`HTTP server listening on ${ config('SERVER:PORT') }`);
  logger.info('The application will return an HTTP status code 500 every 5th request!!!');
});