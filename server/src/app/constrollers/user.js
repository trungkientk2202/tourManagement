const { addUser, findUser } = require('../../config/db/models/user.model')
const { makeSuccessResponse } = require('../../utils/Response');
const { CLIENT_URL } = require('../../utils/Constants');
const global = require('../../global');

const test = (req, res) => {
    console.log(req.user);
    console.log("global: ", global.user);
    res.send('hello world');
};

const getCurrentUser = async (req, res) => {
    const reqUser = req?.user;
    if (reqUser) {
        console.log(reqUser);
        const getUser = await findUser({id: reqUser});
        if (getUser) {
            return makeSuccessResponse(res, 200, {
                data: getUser,
            });
        }
        return makeSuccessResponse(res, 404, {
            error: "User not found!",
        });
    }
    else{
        return makeSuccessResponse(res, 404, {
            message: 'Missing user!',
        });
    }
};

const addNewUser = async (req, res) => {
    const user = req.body;
    if (!user.email) {
        return res.status(404).json({
            error: "Missing user's property!"
        })
    }
    const newUser = await addUser(user);
    if(newUser)
        return makeSuccessResponse(res, 201, {
            data: newUser,
        })
    return makeSuccessResponse(res, 500, {
        message: "Something went wrong!",
    })
};

const logoutUser = (req, res) => {
    req.logOut();
    saveUser = null;
    return res.redirect(CLIENT_URL);
};

const googleLoginFailed = (req, res) => {
    return makeSuccessResponse(res, 401, {
        message: "Login google failed"
    });
}

const googleLoginSuccess = async(req, res) => {
    const user = await findUser({googleId: req.user}) || global.user
    if(req.user && user) {
        
        console.log(user);
        return makeSuccessResponse(res, 200, {
            data: user,
            // cookies: req.cookies
        })
    }
    else if(user)
    {
        return makeSuccessResponse(res, 200, {
            data: user,
            // cookies: req.cookies
        })
    }
    return makeSuccessResponse(res, 404, {
        message: "User not found"
    })
}

const getUser = async (req, res) => {

};

module.exports = {
    test,
    addNewUser,
    getCurrentUser,
    getUser,
    logoutUser,
    googleLoginFailed,
    googleLoginSuccess
}