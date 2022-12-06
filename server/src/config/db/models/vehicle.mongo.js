const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    _id: {
        type: Number,
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