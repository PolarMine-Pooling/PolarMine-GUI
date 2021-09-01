const { app, BrowserWindow } = require('electron')
const path = require('path')
const RPC = require("./Client");

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('polarmine-gui.html')

  (async () => {
    const stat = await RPC.StatsPRC('xchStatus');

    await console.log(stat);
  });
/*
  (async () => {
    const xchStatus = await StatsRPC('xchStatus'); //BUG return false
    const hddStatus = await StatsRPC('hddStatus'); //OKG

    ipcMain.on("toMain", (event, args) => {
      mainWindow.webContents.send("fromMain", '2ST:'+hddStatus);
      mainWindow.webContents.send("fromMain1", '3S:'+xchStatus);
    });
  })()
*/
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
