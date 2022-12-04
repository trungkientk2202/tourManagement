const { Schema, model } = require('mongoose')
const mongoVehicle = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    licensePlate: {
        type: String,
        require: true,
        image: String,
    }, 
})

module.exports =  model('Vehicle', mongoVehicle)