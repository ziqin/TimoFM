var app = require('app')
var mainWindow = null
var BrowserWindow = require('browser-window')

app.on('window-all-closed', function() {
    app.quit()
})

app.on('ready', function() {
    console.log('ready')
    mainWindow = new BrowserWindow({
        width: 600,
        height: 300,
        frame : false,
        resizeable : false,
        //for linux don't support resizeable:false
        icon: "./assets/images/TimoFM.png",
        maxWidth:600,
        minWIdth:600,
        maxHeight:300,
        minHeight:300
    })

    mainWindow.loadURL('file://' + __dirname + '/index.html')

    mainWindow.on('closed', function() {
        mainWindow = null
    })
})


