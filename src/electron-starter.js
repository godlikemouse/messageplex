// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    Menu,
    Tray,
    ipcMain
} = require('electron');
const path = require('path');
const fs = require('fs');

function isDevMode(){
    return process.env.MODE == "dev";
}

let mainWindow = null;
function createWindow(icon) {

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon,
        skipTaskbar: true,
        autoHideMenuBar: true,
        webPreferences: {
            //preload: path.join(__dirname, 'preload.js')
            webviewTag: true,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    const resourcesPath = __dirname.indexOf("app.asar") > 0 ?
        path.join("..", "..", "resources") :
        "extraResources";
    const servicesFile = path.join(path.dirname(__dirname), resourcesPath, "services.json");
    console.log("Loading services file", servicesFile);
    global.services = fs.readFileSync(servicesFile, 'utf-8');
    console.log("Loaded services", global.services);

    // Open the DevTools.
    if(isDevMode()){
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("minimize", event => {
        event.preventDefault();
        mainWindow.hide();
    });

    mainWindow.on("close", event => {
        event.preventDefault();
        mainWindow.hide();
    });

    const startUrl = isDevMode() ? "http://localhost:5000" :
        `file://${__dirname}/../build/index.html`;

    // and load the index.html of the app.
    mainWindow.loadURL(startUrl);

    return mainWindow;
}

const lock = app.requestSingleInstanceLock();
if(!lock){
    return app.quit();
}
else {
    app.on("second-instance", (event, commandLine, workingDirectory) => {
        if(mainWindow){
            if(mainWindow.isMinimized())
                mainWindow.restore();
            if(!mainWindow.isVisible())
                mainWindow.show();
            mainWindow.focus();
        }
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray = null;
app.whenReady().then(() => {

    const icon = `${__dirname}/icons/messageplex.png`;
    const iconNotify = `${__dirname}/icons/messageplex-notify.png`;

    createWindow(icon);

    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Show MessagePlex",
            type: "normal",
            click: (item, win, event) => {
                mainWindow.show();
            }
        },
        {
            label: "Quit MessagePlex",
            type: "normal",
            click: (item, mainWindow, event) => {
                app.exit();
            }
        }
    ]);

    //set tray icon image
    ipcMain.on("tray-notification", (event, arg) => {
        if(arg){
            tray.setImage(iconNotify);
        }
        else{
            tray.setImage(icon);
        }
    });

    tray.setContextMenu(contextMenu);

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
