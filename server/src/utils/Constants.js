require('dotenv').config();

const CONFIG = {
    MONGO_URL: process.env.MONGO_URL,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
    CLIENT_URL: process.env.CLIENT_URL
};

const AUTH_CONFIG = {
    callbackURL: process.env.CALLBACK_URL,
    clientID:  process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}

const LOGIN_TYPE = {
    GOOGLE: 'GOOGLE', 
    NORMAL: 'NORMAL'
}

const ROLES = {
    ADMIN: 'ADMIN',
    NORMAL_USER: 'NORMAL'
}

const FILE_TYPE = {
    IMAGE: 'img',
    VIDEO: 'video',
    AUDIO: 'audio'
}

const TOKENS = {
    PASSWORD_RESET: 'PASSWORD_RESET', 
    EMAIL_VERIFY: 'EMAIL_VERIFY'
}

module.exports = {
    ...CONFIG,
    LOGIN_TYPE,
    ROLES,
    AUTH_CONFIG,
    FILE_TYPE,
    TOKENS
}