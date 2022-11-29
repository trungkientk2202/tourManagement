const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connection.once('open', () => {
    console.log("Mongo already connect!")
})

mongoose.connection.on('error', (err) => {
    console.log(err)
})

function mongoConnect() {
    mongoose.connect(MONGO_URL)
}

function mongoDisconnect() {
    mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}