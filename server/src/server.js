const https = require('https');
const fs = require('fs');
const app = require('./app/app');
const { mongoConnect } = require('./config/db/mongo')
const PORT = process.env.PORT || 8000;

async function startServer() {
    await mongoConnect();
    //"C:\openssl\bin\openssl.exe" req -x509 -config "C:\openssl\ssl\openssl.cnf"  -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
    https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
        //lol
    }, app).listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        });
}
startServer()