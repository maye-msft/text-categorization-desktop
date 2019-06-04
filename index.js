const { app, BrowserWindow } = require('electron')




// const { WebApp } = require('./server');

// WebApp()

let win

function createWindow() {
    

        startWebServer()

    // const startWebApp = require('./server');

    // startWebApp()


        win = new BrowserWindow({ width: 800, height: 600 })

        win.loadURL('http://localhost:3000/public/index.html')
    
        win.on('closed', () => {
            win = null
        })
    




app.on('ready', createWindow)


app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

function startWebServer() {
    const startWebApp = require('./server');
    const cluster = require('cluster');
    const numCPUs = require('os').cpus().length;

    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    } else {

        startWebApp()

        console.log(`Worker ${process.pid} started`);
    }
}
