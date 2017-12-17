'use strict';

const test = require('../js/test.js');
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
  mainWindow.loadURL('file://' + __dirname + '/../html/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
  //console.log('file://' + __dirname + 'html/index.html')
  mainWindow.webContents.openDevTools();

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
    label: 'その他',
    submenu: [
      {label: 'Copy', accelerator: 'Command+C', selector: 'copy'},
      {label: 'Paste', accelerator: 'Command+V', selector: 'paste'}
      ]
  },

  {
    label: 'ネットワーク',
    submenu: [
      {label: 'ペアエディタ(サーバ)', click:function(){let server = new test.miniWindow('/../html/websocektserver.html');}},
      {label: 'ペアエディタ(クライアント)', click:function(){let client = new test.miniWindow('/../html/websocektclient.html');}},
      {label: 'ブラウザ', click:function(){var browser  =new test.browser('http://google.co.jp');}}
       ]
  }
  ]);
  mainWindow.setMenu(menu);
});

app.on('window-all-closed', () => {
    if(process.platform != 'darwin'){
        app.quit();
    }
});

app.on('ready', () => {
    // お使いの画面解像度に応じて調整してください
    mainWindow = new BrowserWindow({width: 1600, height: 900});
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', ()  => {
        mainWindow = null;
    });
});
