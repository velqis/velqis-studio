const { app, BrowserWindow, Menu, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { autoUpdater } = require('electron-updater');
const Store = require('electron-store');

const store = new Store();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../assets/icon.png'),
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#000000',
      symbolColor: '#ffffff'
    },
    show: false,
    backgroundColor: '#000000'
  });

  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (!isDev) {
    autoUpdater.checkForUpdatesAndNotify();
  }
}

app.whenReady().then(() => {
  createWindow();
  createMenu();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function createMenu() {
  const template = [
    {
      label: 'Velqis',
      submenu: [
        {
          label: 'About Velqis',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Velqis',
              message: 'Velqis AI Studio',
              detail: 'AI-powered creative tools for video, image, and music generation.\nVersion 1.0.0'
            });
          }
        },
        { type: 'separator' },
        {
          label: 'Preferences',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            mainWindow.webContents.send('open-settings');
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'New Project',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('new-project');
          }
        },
        {
          label: 'Open Downloads Folder',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            const downloadsPath = store.get('downloadsPath', path.join(require('os').homedir(), 'Downloads', 'Velqis'));
            shell.openPath(downloadsPath);
          }
        },
        { type: 'separator' },
        {
          label: 'Export',
          accelerator: 'CmdOrCtrl+E',
          click: () => {
            mainWindow.webContents.send('export-project');
          }
        }
      ]
    },
    {
      label: 'Tools',
      submenu: [
        {
          label: 'Video Generator',
          accelerator: 'CmdOrCtrl+1',
          click: () => {
            mainWindow.webContents.send('switch-tool', 'video');
          }
        },
        {
          label: 'Image Generator',
          accelerator: 'CmdOrCtrl+2', 
          click: () => {
            mainWindow.webContents.send('switch-tool', 'image');
          }
        },
        {
          label: 'Music Generator',
          accelerator: 'CmdOrCtrl+3',
          click: () => {
            mainWindow.webContents.send('switch-tool', 'music');
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Velqis API Documentation',
          click: () => {
            shell.openExternal('https://docs.velqis.ai');
          }
        },
        {
          label: 'Community',
          click: () => {
            shell.openExternal('https://discord.gg/velqis');
          }
        },
        { type: 'separator' },
        {
          label: 'Report Issue',
          click: () => {
            shell.openExternal('https://github.com/velqis/desktop/issues');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

ipcMain.handle('get-store-value', (event, key, defaultValue) => {
  return store.get(key, defaultValue);
});

ipcMain.handle('set-store-value', (event, key, value) => {
  store.set(key, value);
});

ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  return result;
});

ipcMain.handle('save-file', async (event, defaultPath, filters) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath,
    filters
  });
  return result;
});

ipcMain.handle('show-error-dialog', async (event, title, content) => {
  dialog.showErrorBox(title, content);
});

ipcMain.handle('show-info-dialog', async (event, title, message, detail) => {
  const result = await dialog.showMessageBox(mainWindow, {
    type: 'info',
    title,
    message,
    detail,
    buttons: ['OK']
  });
  return result;
}); 