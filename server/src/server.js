const https = require('http');
const app = require('./app/app');
const {mongoConnect} = require('./config/services/mongo')

const PORT = process.env.PORT || 8000;

(function startServer() {
    mongoConnect()
    https.createServer({}, 
        app).listen(PORT, () => {
            console.log(`Listening on por ${PORT}`)
        });
})();