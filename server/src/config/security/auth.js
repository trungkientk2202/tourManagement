const { findUser, saveUser } = require("../db/models/user.model");
const { makeSuccessResponse } = require('../../utils/Response');
const { ROLES, LOGIN_TYPE } = require('../../utils/Constants');

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    console.log('Google profile ', profile);
    try{
        let getUser = await findUser({email: profile.email});
        if (!getUser) {
            const newUser = await saveUser({
                googleId: profile.id, 
                email: profile.email,
                role: ROLES.ADMIN,
                type: LOGIN_TYPE.GOOGLE
            })
            if(!newUser)
                throw new Error('Save user failed');
        }
        else{
            throw new Error('Email already existed');
        }
    } catch(error)
    {
        console.log(error.message);
        done(null, false, { message: error.message });
    }
    done(null, profile);   
}

const checkLoggedIn = async (req, res, next) => {
    console.log('Current user is: ', req.user);

    const isLoggedIn = (req.isAuthenticated() && req.user)
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
}