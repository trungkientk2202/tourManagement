const mongoose = require('mongoose');
const { LOGIN_TYPE, ROLES } = require('../../../utils/Constants');

const userSchema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    googleId: {
        type: String,
        unique: true,
        require: false
    },
    email: {
        type: String,
        require: true,
        unique: true,
    }, 
    password: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: [ ROLES.ADMIN, ROLES.NORMAL_USER ],
        default: ROLES.NORMAL_USER
    },
    type: {
        type: String,
        enum: [ LOGIN_TYPE.GOOGLE, LOGIN_TYPE.NORMAL ],
        default: LOGIN_TYPE.NORMAL
    },
    status: {
        type: Boolean,
        default: true,
    }
})

module.exports = mongoose.model('User', userSchema);