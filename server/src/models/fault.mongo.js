const { Schema, model } = require('mongoose')
const mongoFault = new Schema({
    id: {
        type: String,
        require: true,
        unique: true,
    },
    name: {
        type: String,
        require: true,
    }, 
    chargeMoney: {
        type: Number,
    }
})

module.exports =  model('Fault', mongoFault)