'use strict'

const WebSocketServer = require('ws').Server;
const {app, Menu, BrowserWindow} = require('electron');
const Path = require('path');

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

class newwindow {
  constructor(filename) {
    const newwindow = new BrowserWindow( {
    width: 400,
    height: 400,
    minWidth: 400,
    minHeight: 400,
    resizable: true,
      } );
    newwindow.loadURL('https://github.com');
    newwindow.loadURL('');
    newwindow.webContents.openDevTools();
  }
}

exports.websocketserver = websocketserver;
exports.newwindow = newwindow;
