require('dotenv').config()

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    SECRET_KEY1: process.env.SECRET_KEY1,
    SECRET_KEY2: process.env.SECRET_KEY2,
}

const AUTH_CONFIG = {
    callbackURL: 'api/user/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}

module.exports = AUTH_CONFIG