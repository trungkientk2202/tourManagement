const https = require('http');
const app = require('./app/app');

const PORT = process.env.PORT || 8000;

(function startServer() {

    https.createServer({}, 
        app).listen(PORT, () => {
            console.log(`Listening on por ${PORT}`)
        });
})();