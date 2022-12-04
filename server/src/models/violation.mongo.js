const { Schema, model } = require('mongoose')
const Vehicle = require('./vehicle.mongo')
const Fault = require('./fault.mongo')
const mongoViolation = new Schema({
    id: {
        type: String,
        require: true,
        unique: true,
    },
    time: {
        type: Date,
    },
    vehicle: {
        type: Vehicle,
        require: true,
    },
    fault: {
        type: Fault,
        require: true,
    }
})

module.exports =  model('Violation', mongoViolation)