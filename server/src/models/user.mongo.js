const mongoose = require('mongoose')
const mongoUser = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
    }, 
})

module.exports = mongoose.model('User', mongoUser)