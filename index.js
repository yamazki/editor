'use strict';

const electron = require("electron");
const {app, Menu, BrowserWindow} = require('electron');
let mainWindow;

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

var menu = Menu.buildFromTemplate([
  {
    label: 'Sample',
    submenu: [
      {label: 'About'},
      {label: 'Quit'}
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
  }
]);
Menu.setApplicationMenu(menu);

