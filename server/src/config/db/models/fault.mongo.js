const mongoose = require('mongoose');

const faultSchema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    name: {
        type: String,
        require: true,
    }, 
    chargeMoney: {
        type: Number,
    }
})

module.exports = mongoose.model('Fault', faultSchema);