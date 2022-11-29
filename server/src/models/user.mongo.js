const { Schema, model } = require('mongoose')
const mongoUser = new Schema({
    id: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    }, 
})

module.exports =  model('User', mongoUser)