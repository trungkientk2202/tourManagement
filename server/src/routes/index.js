const userRoute = require('./user.route');
const imageRoute = require('./image.route');
const recognizeRoute = require('./recognize.route')

function route(app) {
    app.use('/api/user', userRoute);
    app.use('/api/image-video', imageRoute);
    app.use('/api/recognize', recognizeRoute);
};

module.exports = route;