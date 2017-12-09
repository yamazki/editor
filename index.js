'use strict';

const ws = require('./test.js');
const electron = require("electron");
const {app, Menu, BrowserWindow} = require('electron');
let mainWindow;

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
      {label: 'Paste', accelerator: 'Command+V', selector: 'paste'}
      ]
  },
  {
    label: 'ネットワーク',
    submenu: [
      {label: 'ウェブソケットサーバ', click:function(){var server =new ws.websocketserver(8888);}} 
    ]
  }
]);
Menu.setApplicationMenu(menu);

