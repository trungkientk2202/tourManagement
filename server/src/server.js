const app = require('./app/app');
const { mongoConnect } = require('./config/db/mongo')
const PORT = process.env.PORT || 8000;

const server = require('http').Server(app);
const io = require('socket.io')(server);

async function startServer() {
    await mongoConnect();
    //"C:\openssl\bin\openssl.exe" req -x509 -config "C:\openssl\ssl\openssl.cnf"  -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
    // https.createServer({
    //     key: fs.readFileSync('key.pem'),
    //     cert: fs.readFileSync('cert.pem')
    // }, app).listen(PORT, () => {
    //         console.log(`Listening on port ${PORT}`)
    //     });


    // http.createServer(app).listen(PORT, () => [
    //     console.log(`Listening on port ${PORT}`)
    // ]);
    io.on('connection', (socket) => {
        socket.on('stream', async (image) => {
            socket.broadcast.emit('stream', image);
        });
    });
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)

    })
}
startServer()