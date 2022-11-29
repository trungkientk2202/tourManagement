const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const route = require('../routes/index');

const app = express();
app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public'));
})

route(app);
module.exports = app;