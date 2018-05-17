'use strict'

const Service = require('trails/service')
const WebSocket = require('ws');

/**
 * @module SocketService
 * @description socket service
 */
module.exports = class SocketService extends Service {

  constructor(app){

    super(app)
  }

  socketInit(http) {

    const wss = new WebSocket.Server({ server: http })
    wss.on('connection',(ws)=> {

      ws.on('message', (message)=> {
        // broadcast to all
        wss.clients.forEach(c=>{
          c.send(message);
        })
      })
    });
  }
}

