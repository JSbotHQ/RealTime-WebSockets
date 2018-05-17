'use strict'

const Controller = require('trails/controller')

/**
 * @module SocketController
 * @description socket controller.
 */
module.exports = class SocketController extends Controller {

  group(req, res) {
    return res.sendFile('group.html', {root: './public'});
  }
}

