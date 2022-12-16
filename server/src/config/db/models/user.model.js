const users = require('./user.mongo');
const bcrypt = require('bcryptjs');

const getLatestId = async() => {
    const latestUser = await users.findOne().sort('-_id');

    if (!latestUser) {
        return 0;
    }
    return latestUser._id;
}

const fidnAndUpdateUser = async(user) => {
    try {
        await users.findOneAndUpdate({
            email: user.email
        }, {
            _id: Number(await getLatestId() + 1),
            googleId: user?.googleId ? googleId : null,
            password: user?.password ? bcrypt.hashSync(user.password, 10) : null,
            role: user.role,
            type: user.type,
            status: user.status
        }, {upsert: true});

    } catch(err) {
        console.log(err.message);
    }
}

const findUser = async(filter) => {
    try {
        const user = await users.findOne(filter, ('-_id -__v -role -password -status'));
        if(user instanceof users && user)
            return user;
        return false;
    } catch (err) {
        console.log(err);
    }   
}

const saveUser = async(user) => {
    try{
        const initUser = new users({
            _id: Number(await getLatestId() + 1),
            email: user.email,
            googleId: user?.googleId ? googleId : null,
            password: user?.password ? bcrypt.hashSync(user.password, 10) : null,
            role: user.role,
            type: user.type,
            status: user.status
        });
        const newUser = await initUser.save();

        if(newUser instanceof users && newUser)
            return newUser;
        return false;
    }
    catch(error)
    {
        console.log(error.message);
        return false;
    }
}

module.exports = {
    fidnAndUpdateUser,
    findUser,
    saveUser
}