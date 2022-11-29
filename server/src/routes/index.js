const userRoute = require('./user.route');
const imageRoute = require('./image.route');

function route(app) {
    app.use('/api/user', userRoute);
    app.use('/api/image-video', imageRoute);
};

module.exports = route;