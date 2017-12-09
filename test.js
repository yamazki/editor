'use strict'

var WebSocketServer = require('ws').Server;

class websocketserver {
  constructor(port) {
    this.server = {port:8888}
    this.server.port = port;
    this.wss = new WebSocketServer(this.server);
    this.wss.on('open', function open() {
        this.wss.send('something');
    });
  }
}

class websocketclient {
  constructor(host,port) {
    this.host = host;
    this.port = port;
    this.ws = new WebSocket('ws://' + host + ':' + port);
  }
}

exports.websocketserver = websocketserver;
