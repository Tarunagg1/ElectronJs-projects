const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron/main');
const path = require('path');
const url = require('url');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Electron',
        width: 1000,
        height: 500,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration:true,
            preload:path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.webContents.openDevTools()

    const startUrl = url.format({
        pathname: path.join(__dirname, './app/build/index.html'),
        protocol: 'file'
    });

    mainWindow.loadURL(startUrl);
}


app.whenReady().then(createMainWindow)
ipcMain.on('submit:todoform',(event,opts) => {
    console.log(opts);
})