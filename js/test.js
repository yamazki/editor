'use strict'

const {app, Menu, BrowserWindow} = require('electron');
const Path = require('path');
const socketio = require('socket.io');
const os = require('os');
const jquery = require('../lib/jquery-3.2.1.min.js');
const fs = require('fs');

class webSocketServer {
  constructor(port) {
    let io = socketio.listen(port);
    let text = '';
    io.sockets.on('connection', function (socket) {
      console.log('a user connected');
      socket.emit('new message', {
          message: text
        });
      console.log(text);
      socket.on('new message', function (data) {
        socket.broadcast.emit('new message', {
          message: data
         });
        text = data;
        console.log(text);
       });
    });
  }
}
module. exports.webSocketServer = webSocketServer;

class webSocketClient {
  constructor(host,port,editor) {
    this.host = host;
    this.port = port;
    let clientsocket = require('socket.io-client')('http://' + host + ':' + port);
    let callback = function(){
        let text = editor.getValue();
        clientsocket.emit('new message',text);
    };
    
    clientsocket.on('new message', function (data) {
      let pos = editor.session.selection.toJSON();
      console.log(data.message);
      //無限ループするのでイベントハンドラeditor.on削除
      editor.off('change',callback);
      editor.setValue(data.message.toString(),-1);
      editor.session.selection.fromJSON(pos);
      //イベントハンドラeditor.on復活
      editor.on('change',callback);
    });

    editor.on('change',callback);
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

function editorInit(area,mode,theme) {
   let editor = ace.edit(area);
   editor.getSession().setMode(mode);
   editor.setTheme(theme);
   return editor;
}
module.exports.editorInit = editorInit;

function saveAsFile() {
   var win = browserWindow.getFocusedWindow();
   dialog.showSaveDialog(
      win,
      {
         properties: ['openFile'],
      },
      function (fileName) {
         if (fileName) {
            var data = editor.getValue();
            writeFile(fileName, data);
         }
      }
   );
}
module.exports.openFile = openFile;

function writeFile(path, data) {
   fs.writeFile(path, data, function (error) {
      if (error != null) {
         alert('error : ' + error);
         return;
      }
   });
}
module.exports.writeFile = writeFile;

function openFile(){
   var win = browserWindow.getFocusedWindow();
   dialog.showOpenDialog(
      win,
      {
         properties: ['openFile'],
      },
      function (filenames) {
         if (filenames) {
         readFile(filenames[0]);
         }
      });
}
module.exports.openFile = openFile;

function readFile(path) {
   fs.readFile(path, function (error, text) {
      if (error != null) {
         alert('error : ' + error);
         return;
      }
      editor.setValue(text.toString(),-1);
   });
}
module.exports.readFile = readFile;



function setSyntax (path) {
  
}
