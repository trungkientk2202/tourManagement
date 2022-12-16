const mongoose = require('mongoose');
const { TOKENS } = require('../../../utils/Constants');

const tokenSchema = new mongoose.Schema({
    _userId: { 
        type: Number, 
        ref: 'User' 
    },
    token: { 
        type: String, 
        required: true 
    },
    type: {
        type: String,
        enum: [ TOKENS.EMAIL_VERIFY, TOKENS.PASSWORD_RESET ],
        required: true
    },
    expireAt: { 
        type: Date, 
        default: Date.now, 
        index: { expires: 60 }
    }
});

module.exports = mongoose.model('Token', tokenSchema);