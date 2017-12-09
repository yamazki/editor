'use strict';

var WebSocketServer = require('ws').Server;
const electron = require("electron");
const {app, Menu, BrowserWindow} = require('electron');
let mainWindow;

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


app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow(
  {width:  800,
   height: 600,
   
   });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
  mainWindow.webContents.openDevTools();
  
});

const menu = Menu.buildFromTemplate([
  {
    label: 'Sample',
    submenu: [
      {label: 'About'},
      {label: 'Quit'},
      {label: '最小化' ,role:'minimize'}
    ]
  },
  {
    label: 'File',
    submenu: [
      {label: 'New File'},
      {label: 'Paste'}
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {label: 'Copy', accelerator: 'Command+C', selector: 'copy'},
      {label: 'Paste', accelerator: 'Command+V', selector: 'paste'},
      {label: 'Paste', click:function(){ var server = new websocketserver(8888);}}
    ]
  }
]);
Menu.setApplicationMenu(menu);

