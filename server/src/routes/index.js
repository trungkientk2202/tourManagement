const userRoute = require('./user.route');

function route(app) {
    app.use('/api/user', userRoute);
};

module.exports = route;