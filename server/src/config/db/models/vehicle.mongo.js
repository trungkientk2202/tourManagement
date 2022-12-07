const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    licensePlate: {
        type: String,
        require: true,
    }, 
    type: {
        type: String,
    }
})

module.exports =  mongoose.model('Vehicle', vehicleSchema)