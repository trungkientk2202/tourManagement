const https = require('https');
const fs = require('fs');
const app = require('./app/app');
const {mongoConnect} = require('./config/services/mongo')

const PORT = process.env.PORT || 8000;

(function startServer() {

    https.createServer({}, 
        app).listen(PORT, () => {
            console.log(`Listening on por ${PORT}`)
        });
})();