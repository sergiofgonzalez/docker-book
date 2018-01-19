'use strict';

/*
    zeptolog: a minimalist logging library

    Inspired by the work of Matthew Fuller.
*/



module.exports = function (level = 'DEBUG', outputFunction = console.log) { // eslint-disable-line no-console
  function printArguments(paddedLabel, args) {
    outputFunction(`${ new Date().toISOString() } |- ${ paddedLabel } : ${ Array.prototype.join.call(args, ' ') }`);
  }

  let levelValue = 100;
  switch (level) {
    case 'TRACE':
      levelValue = 0;
      break;
    case 'DEBUG':
      levelValue = 1;
      break;
    case 'INFO':
      levelValue = 2;
      break;
    case 'WARN':
      levelValue = 3;
      break;      
    case 'ERROR':
      levelValue = 4;
      break;      
    case 'FATAL':
      levelValue = 5;
      break;      
  }

  return {
    trace: (...args) => {if (levelValue <= 0) printArguments('TRACE ', args);},
    debug: (...args) => {if (levelValue <= 1) printArguments('DEBUG ', args);},
    info:  (...args) => {if (levelValue <= 2) printArguments('INFO  ', args);},    
    warn:  (...args) => {if (levelValue <= 3) printArguments('WARN  ', args);},
    error: (...args) => {if (levelValue <= 4) printArguments('ERROR ', args);},
    fatal: (...args) => {if (levelValue <= 5) printArguments('FATAL ', args);}
  };
};