const {
    addUser, 
    getUserByUsernameAndPassword,
    getLatestId,
    findUser
} = require('../../models/user.model')

const test = (req, res) => {
    console.log('hello')
    res.send('hello world');
}

async function httpGetUser(req, res) {
    const user = req.user
    console.log(user)
    if (user) {
        const re = await findUser({id: user})
        console.log(re)
        if (re) {
            const getUser = {
                id: re.id,
                email: re.email
            }
            return res.status(200).json(getUser)
        }       
    }
    return res.status(404).json({
        error: "User not found!"
    })
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
    httpGetUser
}