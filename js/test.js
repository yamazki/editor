'use strict'

const {app, Menu, BrowserWindow} = require('electron');
const Path = require('path');
const socketio = require('socket.io');
const os = require('os');
const jquery = require('../lib/jquery-3.2.1.min.js');

class webScoketServer {
  constructor(port) {
    let io = socketio.listen(port);
    io.sockets.on('connect', function (socket) {
      console.log('a user connected');
    });
  }
}
module. exports.webScoketServer = webScoketServer;

class webSocketClient {
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
module.exports.webSocketClient = webSocketClient;

class browser {
  constructor(filename) {
    const browser = new BrowserWindow( {
    width:    1000,
    height:   700,
    minWidth: 400,
    minHeight:400,
    resizable:true,
    webPreferences: {webSecurity: false}
      });
    browser.loadURL(filename);
  }
}
module.exports.browser = browser;

class miniWindow {
  constructor(filename) {
    const miniWindow = new BrowserWindow( {
    width: 400,
    height: 400,
    minWidth: 400,
    minHeight: 400,
    resizable: true,
    webPreferences: {webSecurity: false}
      } );
    miniWindow.loadURL('file://' + __dirname + filename);
    let menu = Menu.buildFromTemplate([])
    miniWindow.setMenu(menu);
    miniWindow.webContents.openDevTools();
  }
}
module.exports.miniWindow = miniWindow;

function getUserName() {
  let userInfo = os.userInfo();
  return userInfo.username;
}
module.exports.getUserName = getUserName;

function portCheck(port) {
  if(isNaN(port) == false && 
  port > 0                && 
  port < 65535){ 
    return true;
  } else {
    return false;
  }
}
module.exports.portCheck = portCheck;

function editorInit(area,mode,theme){
   let editor = ace.edit(area);
   editor.getSession().setMode(mode);
   editor.setTheme(theme);
   return editor;
}
module.exports.editorInit = editorInit;


