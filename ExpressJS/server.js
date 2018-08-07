const app = require('express')();
const http = require('http').Server(app);
const url = require('url');
const WebSocket = require('ws');
const wss = new WebSocket.Server({server: http});
const base64Img = require('base64-img');
const fs = require("fs");
const mime = require('mime');
// const wss1 = new WebSocket.Server({noServer: true});
// const wss2 = new WebSocket.Server({noServer: true});

http.listen(4005, () => {
    console.log('listening on *:4005');
});

let noop = () => {
}

let heartbeat = () => {
    console.log('pong called:')
}

/**
 * ws.ping()
 */
// let ping = () => {
//     wss.clients.forEach(function each(ws) {
//         if (ws.isAlive === false) return ws.terminate();
//         ws.isAlive = false;
//         ws.ping(noop);
//     });
// }
//
// let connection = (ws) => {
//     ws.on('message', (message) => {
//         // broadcast to all
//         wss.clients.forEach(c => {
//             c.send(message);
//         })
//     })
// }

// let connection2 = (ws) => {
//     //listen event
//     ws.on('message', (message) => {
//         // broadcast to all
//         wss.clients.forEach(c => {
//             if (c.readyState === ws.open()) {
//                 c.send(data);
//             }
//         })
//     })
// }

/**
 * multi server connected
 * @param request
 * @param socket
 * @param head
 */
// let upgrade = (request, socket, head) => {
//     const pathname = url.parse(request.url).pathname;
//     if (pathname === '/test') {
//         wss1.handleUpgrade(request, socket, head, function done(ws) {
//             wss1.emit('connection', ws, request);
//         });
//     } else if (pathname === '/bar') {
//         wss2.handleUpgrade(request, socket, head, function done(ws) {
//             wss2.emit('connection', ws, request);
//         });
//     } else {
//         socket.destroy();
//     }
// }

//const interval = setInterval(ping,30000);


// wss1.on('connection', connection);
// wss2.on('connection', connection2);
//http.on('upgrade', upgrade);

let data = {
    "binary_small": "hi i am server.",
    "binary_large": "hi i am server. its a socket.io demo of real-time chat. get multiple arguments and emit to others." +
    "Its provide multi user support. Also support group chat and private chat with users. " +
    "socket.io provides socket id for every socket.",
    "text_small": "hi am server.",
    "text_large": "hi i am server. its a socket.io demo of real-time chat. get multiple arguments and emit to others." +
    "Its provide multi user support. Also support group chat and private chat with users. " +
    "socket.io provides socket id for every socket.",
    "json_small": {
        "message": "hi am server",
        "data": "get small data ",
        "work": "realtime chat messaging",
        "getdata": "many types of data you get"
    },
    "json_large": {
        "user": {
            "add_group": {
                "groupname": {
                    "jsbot": {
                        "message": "its jsbot group"
                    }, "Nodejs": {
                        "message": "its Nodejs group"
                    }, "Socket": {
                        "message": "its socket group"
                    }, "remove": "group"
                }
            }
        }
    }
}
let convert = (input) => {
    let output = "";
    for (let i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2) + " ";
    }
    return output
}
/**
 * convert file to base64
 * @param file
 * @returns {string}
 */
let base64_encode = (file) =>{
    // read data
    let bitmap = fs.readFileSync(file);
    // convert data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

/**
 * get small image base64 string
 */
let small_imgUrl
base64Img.base64('./public/js_(3.1k).png', (err, data) => {
    small_imgUrl = data
})

/**
 * get large image base64 string
 */
let large_imgUrl
base64Img.base64('./public/car_(2.1MB).jpg', (err, data) => {
    large_imgUrl = data
})

let med_imgUrl
base64Img.base64('./public/apple_(9.8kb).jpeg', (err, data) => {
    med_imgUrl = data
})


let wssconnection = (ws) => {
   // session.setResourceTimingBufferSize(200000);
    ws.isAlive = true;
    //websocket pong
    ws.on('pong', heartbeat);

    //console.log(wss.address())
    //send message
    // ws.on('message', (message) => {
    //     // broadcast to all
    //     wss.clients.forEach(c => {
    //         c.send(message);
    //     })
    // })
   //  //emit text data
   // let text_small = () => wss.clients.forEach(c => {  c.send(data.text_small) })
   // let text_large = () =>wss.clients.forEach(c => {  c.send( data.text_large)})
   // let text_multi = () =>wss.clients.forEach(c => {  c.send(data.text_small, data.text_large, data.text_small)})
   //  //emit json data
   // let json_small = () => wss.clients.forEach(c => {  c.send(JSON.stringify(data.json_small))})
   // let json_large = () => wss.clients.forEach(c => {  c.send(JSON.stringify(data.json_large))})
   // let json_multi = () => wss.clients.forEach(c => { c.send(JSON.stringify(data.json_small, data.json_large, data.json_small))})
   //      // //emit binary data
   //  let binary_small = () => wss.clients.forEach(c => {  c.send( convert(data.binary_small))})
   //  let binary_large = () => wss.clients.forEach(c => {  c.send( convert(data.binary_large))})
   //  let binary_multi = () =>wss.clients.forEach(c => {  c.send( convert(data.binary_small), convert(data.binary_large), convert(data.binary_small))})
   //      //emit img data
   //  let img_small = () => wss.clients.forEach(c => {  c.send(small_imgUrl)})
   //  let img_large = () => wss.clients.forEach(c => {  c.send(large_imgUrl)})
    let file= (file) =>{console.log(JSON.stringify(file))
        wss.clients.forEach(c => {  c.send(file)})}

    // ws.on('message',text_small)
    // ws.on('message',text_large)
    // ws.on('message',text_multi)
    //
    // ws.on('message',json_small)
    // ws.on('message',json_large)
    // ws.on('message',json_multi)
    //
    // ws.on('message',binary_small)
    // ws.on('message',binary_large)
    // ws.on('message',binary_multi)
    // //
    // ws.on('message',img_small)
    // ws.on('message',img_large)
    ws.on('message',file)
}


wss.on('connection',wssconnection);
app.get('/test', (req, res) => {
    res.sendFile('test.html', {root: './public'});
});
app.get('/group', (req, res) => {
    res.sendFile('group.html', {root: './public'});
});

app.get('/modifier', (req, res)=> {
    res.sendFile('modifier.html', {root: './public'});
})