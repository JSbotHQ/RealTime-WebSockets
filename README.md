# RealTime-Socket.IO

#1. ExpressJS
  - `cd ExpressJS`
  - start the server by `npm start`.

  i. client to server & server to client
   - go to `http://localhost:4005/group`.

  client code logic:

      $('form').submit(()=>{
          let id = $('#id').val()
          let message = $('#m').val()
          ws.send(message);
          $('#m').val('');
          return false;
      });

      ws.onmessage = (msg)=> {
        $('#messages').append($('<li>').text(msg.data));
      }

  server code logic:

      ws.on('message', (message)=> {
        // broadcast to all
        wss.clients.forEach(c=>{
          c.send(message);
        })
      })

  ii. room messaging
   - Websockets doesn't provide feature for sending messages to room.


#2. TrailsJS
  - `cd TrailsJS`
  - start the server by `npm start`.

  i. client to server & server to client
   - go to `http://localhost:4005/group`.

  client code logic:

      $('form').submit(()=>{
          let id = $('#id').val()
          let message = $('#m').val()
          ws.send(message);
          $('#m').val('');
          return false;
      });

      ws.onmessage = (msg)=> {
        $('#messages').append($('<li>').text(msg.data));
      }

  server code logic:

      ws.on('message', (message)=> {
        // broadcast to all
        wss.clients.forEach(c=>{
          c.send(message);
        })
      })

  ii. room messaging
   - Websockets doesn't provide feature for sending messages to room.

#3. HapiJS
  - `cd HapiJS`
  - start the server by `npm start`.

  i. client to server & server to client
   - go to `http://localhost:4005/group`.

  client code logic:

      $('form').submit(()=>{
          let id = $('#id').val()
          let message = $('#m').val()
          ws.send(message);
          $('#m').val('');
          return false;
      });

      ws.onmessage = (msg)=> {
        $('#messages').append($('<li>').text(msg.data));
      }

  server code logic:

      ws.on('message', (message)=> {
        // broadcast to all
        wss.clients.forEach(c=>{
          c.send(message);
        })
      })

  ii. room messaging
   - Websockets doesn't provide feature for sending messages to room.