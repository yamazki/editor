'use strict'

const WebSocketServer = require('ws').Server;
const {app, Menu, BrowserWindow} = require('electron');
const Path = require('path');
const socketio = require('socket.io');

class websocketserver {
  constructor(port) {
    try {
    let io = require('socket.io').listen(port);
    io.sockets.on('connection', function (socket) {
    });
    alert('起動に成功しました');
    } catch(e){
      alert('起動に失敗しました');
    }
  }
}

class websocketclient {
  constructor(host,port) {
    this.host = host;
    this.port = port;
    this.ws = new WebSocket('ws://' + host + ':' + port);
  }
}

class browserwindow {
  constructor(filename) {
    const browserwindow = new BrowserWindow( {
    width:    1000,
    height:   700,
    minWidth: 400,
    minHeight:400,
    resizable:true,
    webPreferences: {webSecurity: false}
      });
    browserwindow.loadURL(filename);
  }
}

class miniwindow {
  constructor(filename) {
    const miniwindow = new BrowserWindow( {
    width: 400,
    height: 400,
    minWidth: 400,
    minHeight: 400,
    resizable: true,
    webPreferences: {webSecurity: false}
      } );
    miniwindow.loadURL('file://' + __dirname + filename);
    const menu = Menu.buildFromTemplate([])
    miniwindow.setMenu(menu);
    miniwindow.webContents.openDevTools();
  }
}

exports.websocketserver = websocketserver;
exports.miniwindow = miniwindow;
exports.browserwindow = browserwindow;
