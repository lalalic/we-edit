const {app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win=null

function createMain(){
	win=new BrowserWindow({width: 800, height: 600})
	win.loadURL("http://localhost:9092"
		/*
		url.format({
			pathname: path.join(__dirname, 'index.html'),
			protocol: 'file:',
			slashes: true
		})
		*/
	)
	win.webContents.openDevTools()
	win.on('closed', () => {
		win = null
    })
}

app.on("ready", createMain)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
	  app.quit()
	}
})

app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
})