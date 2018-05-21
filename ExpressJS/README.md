# RealTime-Socket.IO

#1. ExpressJS

  i. client to server & server to client
   - go to `http://localhost:4005/group`.

  client code logic:

      ws.send(message);

      ws.onmessage = (msg)=> {
        console.log(msg)
      }

  server code logic:

      wss.clients.forEach(c=>{
          c.send(message)
      })
      ws.on('message', (msg)=> {
        console.log(msg)
      })

  ii. room messaging
   - Websockets doesn't provide feature for sending messages to room.