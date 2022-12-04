const mongoose = require('mongoose')
const { MONGO_URL } = require('../../utils/Constants')

mongoose.connection.once('open', () => {
    console.log("Mongo connected!");
})

mongoose.connection.on('error', (err) => {
    console.log("Mongo connect error:", err);
})

const mongoConnect = () => {
    mongoose.connect(MONGO_URL);
}

const mongoDisconnect = async () => {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}