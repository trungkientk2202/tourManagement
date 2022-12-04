const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    licensePlate: {
        type: String,
        require: true,
        image: String,
    }, 
})

module.exports =  mongoose.model('Vehicle', vehicleSchema)