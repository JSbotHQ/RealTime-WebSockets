const app = require('express')();
const http = require('http').Server(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: http });

http.listen(4005, ()=>{
  console.log('listening on *:4005');
});

wss.on('connection',(ws)=> {

  ws.on('message', (message)=> {
    // broadcast to all
    wss.clients.forEach(c=>{
      c.send(message);
    })
  })
});

// Route for group chat (room chat)
app.get('/group', (req, res)=> {
    res.sendFile('group.html', {root: './public'});
});