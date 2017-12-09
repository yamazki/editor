'use strict'

var WebSocketServer = require('ws').Server;

class websocketserver {
  constructor(port) {
    this.server = {port:8888}
    this.server.port = port;
    this.wss = new WebSocketServer(this.server);
	this.wss.on('connection', function(ws) {
       	 ws.on('message', function(message) {
        	console.log('received: %s', message);
        	});
        ws.send('something');
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
