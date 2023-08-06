const {
  app,
  BrowserWindow,
  globalShortcut,
  dialog,
  Tray,
  Menu,
  webFrame,
  ipcMain,
} = require("electron");
const windowStateKeeper = require("electron-window-state");

let win;

console.log(process.platform);

const isMac = process.platform === "darwin";

const templates = [
  {
    label: "File",
    submenu: [
      { label: "New file" },
      { label: "New window" },
      isMac
        ? { role: "close", label: "Quit" }
        : { role: "quit", label: "Quit" },
    ],
  },
  { label: "Edit" },
  { label: "Selection" },
  { label: "View" },
  { label: "Go" },
  { label: "Run" },
];

const menu = Menu.buildFromTemplate(templates);
Menu.setApplicationMenu(menu);

const contextTemplate = [
  { label: "item 1" },
  { label: "item 2" },
  { role: "minimize" },
];
let contextMenu = Menu.buildFromTemplate(contextTemplate);

ipcMain.on("msg", (e, agr) => {
  console.log(agr);
});

const createWindow = () => {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 800,
  });

  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    // backgroundColor:"#ff0000",
    title: "wesome app",
    // darkTheme:true,
    // frame:false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindowState.manage(win);

  // const child = new BrowserWindow({
  //     parent: win,
  // })

  // child.loadFile('child.html');
  // child.show();

  win.loadFile("index.html");
  const wc = win.webContents;

  wc.on("dom-ready", () => {
    console.log("dom is ready");
  });

  //   wc.on("before-input-event", () => {
  //     console.log("key pressed");
  //   });

  globalShortcut.register("Shift+k", () => {
    win.loadFile("other.html");
  });

  win.webContents.on("context-menu", () => {
    contextMenu.popup();
  });

  // win.webContents.on('did-finish-load',()=>{
  //     dialog.showOpenDialog()
  // })

  // globalShortcut.register('o',()=>{
  //     dialog.showOpenDialog()
  // });

  // Tray
  const tray = new Tray("img.png");
  tray.setToolTip("Tray to app");

  tray.on("click", () => {
    win.isVisible() ? win.hide() : win.show();
  });

  let template = [{ label: "item1" }, { label: "item2" }];
  const contectMMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(contectMMenu);
};

// app.whenReady().then(() => {
//     createWindow()
// })

// app.on('before-quit',(e)=>{
//     console.log('quit before');
//     e.preventDefault();
// });

// app.on('browser-window-focus',(e)=>{
//     console.log('on app');
// })

// app.on('browser-window-blur',(e)=>{
//     console.log('you atre unfocus');
// })

app.on("ready", () => {
  console.log("applicaton ready");
  createWindow();
});
