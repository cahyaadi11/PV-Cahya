const electron = require("electron");
const { v4 : uuidv4 } = require('uuid');
uuidv4();

const {
    app, 
    BrowserWindow, 
    Menu, 
    ipcMain
} = electron;

let todayWindow;
let customerWindow;
let listWindow;
let aboutWindow;

let allkasir = [];

app.on("ready", () => {
    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }, 
        title : "Aplikasi Kasir"
    });

    todayWindow.loadURL(`file://${__dirname}/today.html`);
    todayWindow.on("closed", () => {

        app.quit();
        todayWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

const listWindowCreator = () => {
    listWindow = new BrowserWindow ({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Data"
    });

    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);
    listWindow.on("closed", ()  => (listWindow = null));
};
const customerWindowCreator = () => {
    customerWindow = new BrowserWindow ({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Customer "
    });

    customerWindow.setMenu(null);
    customerWindow.loadURL(`file://${__dirname}/customer.html`);
    customerWindow.on("closed", ()  => (customerWindow = null));
};

const bayarWindowCreator = () => {
    bayarWindow = new BrowserWindow ({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Kasir"
    });

    bayarWindow.setMenu(null);
    bayarWindow.loadURL(`file://${__dirname}/kasir.html`);
    bayarWindow.on("closed", ()  => (bayarWindow = null));
};

const aboutWindowCreator = () => {
    aboutWindow = new BrowserWindow ({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "About Admin"
    });

    aboutWindow.setMenu(null);
    aboutWindow.loadURL(`file://${__dirname}/about.html`);
    aboutWindow.on("closed", ()  => (aboutWindow = null));
};



ipcMain.on("kasir:customer", (event, kasir) => {
    kasir["id"] = uuidv4();
    kasir["done"] = 0;
    allkasir.push(kasir);

    customerWindow.close();

    console.log(allkasir);
});

ipcMain.on("kasir:request:list", event => {
    listWindow.webContents.send('kasir:response:list', allkasir);
});

ipcMain.on("kasir:request:today", event => {
    console.log("here2");
});

ipcMain.on("kasir:done", (event, id) => {
    console.log("here3");
});

const menuTemplate =  [{
        label: "Customer",
        submenu:[{
                label: "Input Data Pelanggan",

                click() {
                    customerWindowCreator()
                }
            },
            {
                label: "Data pelanggan",
                click() {
                    listWindowCreator();
                }
            },
            {
                label: "Quit",
                accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl + Q",
                click() {
                    app.quit();
                }
            }
        ]
    },

    {
        label: "kasir",
        click(){
            bayarWindowCreator();
        }
    }
    ,
    {

        label: "View",
        submenu: [{ role: "reload" }, { role: "toggledevtools" }]
    }
    ,
    {

        label: "About",
        click(){
            aboutWindowCreator();
}
    }
   


]