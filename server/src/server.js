const app = require('./app');
const http = require('http');

http.createServer(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log('Listening at port ', PORT);
})