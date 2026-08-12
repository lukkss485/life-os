// No seu app.js, onde você cria a janela:
const { app, BrowserWindow } = require('electron');

const path = require('path'); // Importe o módulo path

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 1000,
    minWidth: 600,
    minHeight: 422,
    frame: true,
    backgroundColor: '#00000000',
    // Adicione esta linha:
    icon: path.join(__dirname, './public/logopng.png'), // Ou 'icon.png' / 'icon.icns'
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webgl: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.setMenuBarVisibility(false);
  win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});