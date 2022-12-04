const users = require('./user.mongo');
const bcrypt = require('bcryptjs');

const getLatestId = async() => {
    const latestUser = await users.findOne().sort('-_id');

    if (!latestUser) {
        return 0;
    }
    return latestUser._id;
}

const addUser = async(user) => {
    try {
        const initUser = await users.findOneAndUpdate({
            email: user.email
        }, {
            _id: Number(await getLatestId() + 1),
            googleId: user.googleId,
            password: user?.password ? bcrypt.hashSync(user.passWord, 10) : null,
            role: user.role,
            type: user.type
        }, {upsert: true});

        if(initUser instanceof users && initUser)
            return initUser;
        return false;
    } catch(err) {
        console.log(err);
        return false;
    }
}

const findUser = async(filter) => {
    try {
        const user = await users.findOne(filter, ('-_id -__v -role -password -status -type'));
        if(user instanceof users && user)
            return user;
        return false;
    } catch (err) {
        console.log(err);
    }   
}

module.exports = {
    addUser,
    findUser,
}