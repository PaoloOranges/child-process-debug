var debug_process = require('./debug.js')

const childScript = 'testChild.js';

const forked = debug_process.fork(childScript);

forked.on('message', (msg) => {
    console.log('Message from child', msg);
  });
  
  forked.send({ hello: 'world' });
