'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server=Hapi.server({
  host: 'localhost',
  port: 4005
});
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: server.listener });

// Start the server
const start = async ()=> {

  try {
    await server.register(require('inert'));

    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};
start();

wss.on('connection',(ws)=> {

  ws.on('message', (message)=> {
    // broadcast to all
    wss.clients.forEach(c=>{
      c.send(message);
    })
  })
});

// ROUTES
server.route({
  method:'GET',
  path:'/group',
  handler:function(request, h) {
    return h.file('./public/group.html')
  }
});