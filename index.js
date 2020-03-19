const electron = require("electron");

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = electron;

let todayWindow;
let createWindow;
let listWindow;
let aboutWindow;


app.on("ready", () => {
    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title: "Aplikasi Dokter"
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
    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "All Appointments"
    });

    listWindow.setMenu(null)
    listWindow.loadURL(`file://${__dirname}/list.html`);
    listWindow.on("closed", () => (listWindow = null));
};
const createWindowCreator = () => {
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Create Appointments"
    });

    createWindow.setMenu(null)
    createWindow.loadURL(`file://${__dirname}/create.html`);
    createWindow.on("closed", () => (createWindow = null));
};


const aboutWindowCreator = () => {
    aboutWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "About"
    });

    aboutWindow.setMenu(null)
    aboutWindow.loadURL(`file://${__dirname}/about.html`);
    aboutWindow.on("closed", () => (aboutWindow = null));
};

ipcMain.on("appointment:create", (event, appointment) => {
    console.log(appointment);
});
ipcMain.on("appointment:request:list", event => {
    console.log("here");
});
ipcMain.on("appointment:request:today", event => {
    console.log("here2");
});
ipcMain.on("appoinment:done", (event, id) =>{
    console.log("here3");
})

ipcMain.on("appointment:request:about", event => {
    console.log("about");
});

const menuTemplate = [{
    label: "File",
    submenu: [{
        label: "New Appointment",

        click() {
            createWindowCreator();
        }
    },
    {
        label: "All Appointments",
        click() {
            listWindowCreator();
        }
    },
    {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command +Q" : "Ctrl + Q",
        click() {
            app.quit();
        }
    }
    ]
},

{
    label: "View",
    submenu: [{ role: "reload" }, { role: "toggledevtools" }]
},

{
    label: "about",
    click() {
        aboutWindowCreator();
    }
}

]