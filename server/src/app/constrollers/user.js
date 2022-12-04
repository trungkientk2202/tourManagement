const {
    addUser, 
    getUserByUsernameAndPassword,
    getLatestId,
} = require('../../models/user.model')

const test = (req, res) => {
    console.log(req.user);
    res.send('hello world');
}

async function httpAddNewUser(req, res) {
    const user = req.body
    if (!user.email) {
        return res.status(404).json({
            error: "Missing user's property!"
        })
    }
    await addUser(user)
    return res.status(201).json(user)
}

module.exports = {
    test, 
    httpAddNewUser,
}