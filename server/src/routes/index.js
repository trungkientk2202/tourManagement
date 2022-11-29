const userRoute = require('./user.route');
const imageRoute = require('./image.route');
const { checkLoggedIn } = require('../config/security/login');

function route(app) {
    app.use('/',checkLoggedIn, userRoute);
    app.use('/api/user', userRoute);
    app.use('/api/image-video', imageRoute);
};

module.exports = route;