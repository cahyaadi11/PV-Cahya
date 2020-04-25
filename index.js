const electron = require("electron");
const { v4 : uuidv4 } = require('uuid');
uuidv4();
const {
    app, 
    BrowserWindow, 
    Menu, 
    ipcMain
} = electron;

let ProgramKasirWindow;

app.on("ready", () => {
    ProgramKasirWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }, 
        title : "Program Kasir Sederhana"
    });

    ProgramKasirWindow.loadURL(`file://${__dirname}/ProgramKasir.html`);
    ProgramKasirWindow.on("closed", () => {

        app.quit();
        todayWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

    const menuTemplate = [{
                    label: "Quit",
                    accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl + Q",
                    click() {
                        app.quit();
                    }
         
        },
    
        {
            label: "View",
            submenu: [{ role: "reload" }, { role: "toggledevtools" }]
        }
    ]
