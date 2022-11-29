const mongoose = require('mongoose')
const mongoUser = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
    }, 
    password: {
        type: String,
    },
    type: {
        type: ENUM,
    },
    image: {
        type: String,
    }
})

module.exports = mongoose.model('User', mongoUser)