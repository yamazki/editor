'use strict'

const WebSocketServer = require('ws').Server;
const {app, Menu, BrowserWindow} = require('electron');
const Path = require('path');
const socketio = require('socket.io');

class websocketserver {
  constructor(port) {
      let io = socketio.listen(port);
      io.sockets.on('connection', function (socket) {
    });
  }
}

class websocketclient {
  constructor(host,port) {
    this.host = host;
    this.port = port;
    var flag = false;
    let clientsocket = require('socket.io-client')('http://' + host + ':' + port);
    clientsocket.on('connect', function() {
      // ログイン通知
      clientsocket.send('login');
    });
  }
}

class websocketclienttest {
  constructor(host,port) {
    this.host = host;
    this.port = port;
    try{
    this.socket = socketioclient('ws://' + host + ':' + port);
    }catch(e){alert('asdfasdf');}
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

function sleep (time) {
	const d1 = new Date();
	while (true) {
  		const d2 = new Date();
  		if (d2 - d1 > time) {
    	break;
  		}
  	}
};

exports.websocketserver = websocketserver;
exports.miniwindow = miniwindow;
exports.browserwindow = browserwindow;
