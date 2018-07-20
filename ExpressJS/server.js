const app = require('express')();
const http = require('http').Server(app);
const url = require('url');
const WebSocket = require('ws');
//const wss = new WebSocket.Server({server: http});
const wss1 = new WebSocket.Server({noServer: true});
const wss2 = new WebSocket.Server({noServer: true});

http.listen(4005, () => {
    console.log('listening on *:4005');
});

let noop = () => {
}

let heartbeat = () => {
    console.log('pong called:')
}

let wssconnection = (ws) => {
    interval
    ws.isAlive = true;
    //websocket pong
    ws.on('pong', heartbeat);

    //console.log(wss.address())
    //send message
    ws.on('message', (message) => {
        // broadcast to all
        wss.clients.forEach(c => {
            c.send(message);
        })
    })
}
/**
 * ws.ping()
 */
let ping = () => {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping(noop);
    });
}

let connection = (ws) => {
    ws.on('message', (message) => {
        // broadcast to all
        wss1.clients.forEach(c => {
            c.send(message);
        })
    })
}

let connection2 = (ws) => {
    //listen event
    ws.on('message', (message) => {
        // broadcast to all
        wss1.clients.forEach(c => {
            if (c.readyState === ws.open()) {
                c.send(data);
            }
        })
    })
}

/**
 * multi server connected
 * @param request
 * @param socket
 * @param head
 */
let upgrade = (request, socket, head) => {
    const pathname = url.parse(request.url).pathname;
    if (pathname === '/test') {
        wss1.handleUpgrade(request, socket, head, function done(ws) {
            wss1.emit('connection', ws, request);
        });
    } else if (pathname === '/bar') {
        wss2.handleUpgrade(request, socket, head, function done(ws) {
            wss2.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
}

//const interval = setInterval(ping,30000);

//wss.on('connection',wssconnection);
wss1.on('connection', connection);
wss2.on('connection', connection2);
http.on('upgrade', upgrade);

app.get('/test', (req, res) => {
    res.sendFile('test.html', {root: './public'});
});
app.get('/group', (req, res) => {
    res.sendFile('group.html', {root: './public'});
});