'use strict'

const WebSocketServer = require('ws').Server;
const {app, Menu, BrowserWindow} = require('electron');
const Path = require('path');
const socketio = require('socket.io');
const os = require('os');
const jquery = require('../lib/jquery-3.2.1.min.js');

class websocketserver {
  constructor(port) {
    let io = socketio.listen(port);
    io.sockets.on('connect', function (socket) {
      console.log('a user connected');
    });
  }
}
module. exports.websocketserver = websocketserver;

class websocketclient {
  constructor(host,port) {
    this.host = host;
    this.port = port;
    var flag = false;
    let clientsocket = require('socket.io-client')('http://' + host + ':' + port);
    clientsocket.on('connection', function() {
      clientsocket.send('login');
    });
  }
}
module.exports.websocketclient = websocketclient ;

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
module.exports.browserwindow = browserwindow;

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
    let menu = Menu.buildFromTemplate([])
    miniwindow.setMenu(menu);
    miniwindow.webContents.openDevTools();
  }
}
module.exports.miniwindow = miniwindow;

function getusername() {
  let userInfo = os.userInfo();
  return userInfo.username;
}
module.exports.getusername = getusername;

function portcheck(port) {
  if(isNaN(port) == false && 
  port > 0                && 
  port < 65535){ 
    return true;
  } else {
    return false;
  }
}
module.exports.portcheck = portcheck;

function editorinit(area,mode,theme){
   let editor = ace.edit(area);
   editor.getSession().setMode(mode);
   editor.setTheme(theme);
   return editor;
}
module.exports.editorinit = editorinit;
