import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 660,
    icon:"./src/img/icon.jpeg",
    acceptFirstMouse:true,
    autoHideMenuBar:true,
    // fullscreen:true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.disableHardwareAcceleration();
