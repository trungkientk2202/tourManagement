const userDatabase = require('./user.mongo')

const DEFAULT_ID = 1

async function addUser(user) {
    try {
        await planetsMongo.insertOne(user)
    } catch(err) {
        console.log(err)
    }
}

async function getUserByUsernameAndPassword(email, password) {
    const user = await userDatabase.findOne({
        email: email,
        password: password,
    })
    return user
}

async function getLatestId() {
    const latestUser = await userDatabase
    .findOne()
    .sort('-id')

    if (!latestUser) {
        return DEFAULT_ID
    }
    return latestUser.id
}

module.exports = {
    addUser,
    getUserByUsernameAndPassword,
    getLatestId,
}