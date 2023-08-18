const path = require('path');
const os = require('os');
const fs = require('fs');
const resizeImg = require('resize-img');
const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;
let aboutWindow;

// Crate the main window
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Image resizer',
        width: isDev ? 1000 : 500,
        height: 600,
        icon: `${__dirname}/assets/icons/Icon_256x256.png`,
        resizable: isDev,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

function crateAboutWindow() {
    aboutWindow = new BrowserWindow({
        title: 'About',
        width: 300,
        height: 300
    });
    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}

// App is ready
app.whenReady().then(() => {
    createMainWindow();

    // Implement menu
    // const mainMenu = Menu.buildFromTemplate(menu);
    // Menu.setApplicationMenu(mainMenu);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });


    aboutWindow.on('closed', () => {
        mainWindow = null;
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});


// Menu template
const menu = [
    ...(isMac
        ? [
            {
                label: app.name,
                submenu: [
                    {
                        label: 'About',
                        click: createAboutWindow,
                    },
                ],
            },
        ]
        : []),
    {
        label: "File",
        submenu: [
            {
                label: 'Quit',
                click: () => app.quit(),
                accelerator: 'CmdOrCtrl+W',
            },
        ]
    },
    ...(!isMac ? [
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: crateAboutWindow
                }
            ]
        }
    ] : [])
]


ipcMain.on('image:resize', (e, options) => {
    console.log(options);
    options.dest = path.join(os.homedir(), 'imagesizer');
    // const {imgPath,width,height} = options;
    resizeImage(options);
})

async function resizeImage({ imgPath, width, height, dest }) {
    try { 
        const newPath = await resizeImg(fs.readFileSync(imgPath), {
            width: +width,
            height: +height,
        });

        const filename = Date.now()+path.basename(imgPath);

        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.writeFileSync(path.join(dest, filename), newPath);

        mainWindow.webContents.send('image:done');
        shell.openPath(dest);
    } catch (error) {
        console.log(error);
    }
}

app.on('window-all-closed', () => {
    if (!isMac) app.quit();
});