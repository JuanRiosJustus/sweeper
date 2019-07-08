const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow } = electron;

let mainWindow;

// listen for the app to be ready
app.on('ready', function(){
    // create window 
    mainWindow = new BrowserWindow({
        width: 1305,  
        height: 745,
        resizeable: false,
        center: true,
    });
    // load html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file',
        slashes: true
    }));
});