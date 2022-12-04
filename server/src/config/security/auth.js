const { addUser, findUser } = require("../db/models/user.model");
const { makeSuccessResponse } = require('../../utils/Response');
const { ROLES, LOGIN_TYPE } = require('../../utils/Constants');

let saveUser = null;
const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    console.log('Google profile ', profile);
    try{
        saveUser = await findUser({email: profile.email});
        if (!saveUser) {
            saveUser = await addUser({
                googleId: profile.id, 
                email: profile.email,
                role: ROLES.ADMIN,
                type: LOGIN_TYPE.GOOGLE
            });
        }
    }catch(error)
    {
        console.log(error.message);
        done(error, profile);
    }
    done(null, profile);   
}

const checkLoggedIn = async (req, res, next) => {
    console.log('Current user is: ', req.user);

    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
        return makeSuccessResponse(res, 401, {
            message: "You must login",
        })
    }
    next();  
}

module.exports = {
    verifyCallback,
    checkLoggedIn,
    saveUser
}