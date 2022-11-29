const { addUser, findUser } = require("../../models/user.model")


async function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log('Google profile ', profile)
    const user = findUser({email: profile.email})
    if (!user) {
        await addUser({id: profile.id, email: profile.email})
    }
    done(null, profile)
}

function checkLoggedIn(req, res, next) {
    console.log('Current user is: ', req.user)
    const isLoggedIn = req.isAuthenticated() && req.user
    if (!isLoggedIn) {
        res.status(401).json({
            error: "You must log in!"
        })
        
    }
    next()  
}

module.exports = {
    verifyCallback,
    checkLoggedIn,
}