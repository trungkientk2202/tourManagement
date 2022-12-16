const { findUser, saveUser } = require("../db/models/user.model");
const { makeSuccessResponse } = require('../../utils/Response');
const { ROLES, LOGIN_TYPE } = require('../../utils/Constants');
const userMongo = require('../db/models/user.mongo');
const bcrypt = require('bcryptjs');

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    console.log('Google profile ', profile);
    try {
        let getUser = await findUser({email: profile.email});
        if (!getUser) {
            getUser = await saveUser({
                googleId: profile.id, 
                email: profile.email,
                role: ROLES.ADMIN,
                type: LOGIN_TYPE.GOOGLE
            })
            if(!getUser)
                done(null, false, { message: 'Something went wrong!' });
        }
        else if(getUser.type !== LOGIN_TYPE.GOOGLE) 
        {
            done(null, false, { message: `The email address ${profile.email} has already been associated with another account `});
            console.log(getUser.type);
        }
        done(null, getUser);
    } catch(error)
    {
        console.log(error.message);
        done(error);
    }
}

const verifyUser = async (email, password, done) => {
    try{
        const getUser = await userMongo.findOne({ email: email });
        console.log(email, password);
        if (!getUser)
        {
            return done(null, false, { message: `The email address ${email} is not associated with any account. please check and try again!'` });
        }
        else if(getUser.type !== LOGIN_TYPE.NORMAL)
        {
            return done(null, false, { message: `The email address ${email} has already been associated with another account`});
        }
        else if (!bcrypt.compareSync(password, getUser.password))
        {
            return done(null, false, { message: `Wrong password` });
        }
        else if (!getUser.status)
        {
            return done(null, false, { message: `Your Email has not been verified. Please click on resend` });
        }
        else {
            return done(null, getUser);
        }
    }catch(error)
    {
        console.log(error);
        return done(error);
    }
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
    verifyUser,
    checkLoggedIn,
}