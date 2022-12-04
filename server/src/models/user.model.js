const userDatabase = require('./user.mongo')

const DEFAULT_ID = 1

async function addUser(user) {
    try {
        await userDatabase.updateOne({email: user.email}, {
            id: user.id, email: user.email
        }, {
            upsert: true
        })
    } catch(err) {
        console.log(err)
    }
}

async function findUser(filter) {
    try {
        const user = await userDatabase.findOne(filter)
        return user
    } catch (err) {
        console.log(err)
        return {}
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
    findUser,
}