'use strict';

const test = require('./test.js');
const {app, Menu, BrowserWindow} = require('electron');
let mainWindow;

app.on('ready', function() {
  mainWindow = new BrowserWindow(
  {width:  800,
   height: 600,
   webPreferences:{
     webSecurity:false
     }
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
  //mainWindow.webContents.openDevTools();
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
      {label: 'ウェブソケットサーバ', click:function(){var server =new test.miniwindow('/websocektserver.html');}},
      {label: 'ブラウザ', click:function(){var browser  =new test.browserwindow('http://google.co.jp');}}
       ]
  }
]);
Menu.setApplicationMenu(menu);

