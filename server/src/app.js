const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(morgan('combined'));
app.use(cors({
    origin: "http://localhost:3000",
}));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

module.exports = app;