const userRoute = require('./user.route');
//const { checkLoggedIn } = require('../config/security/login');


function route(app) {
    app.use('/', userRoute);
};

module.exports = route;