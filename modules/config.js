const path = require('path')

module.exports = {
    port: 8000,
    NODE_ENV : 'dev',
    secret : 'dfsvdsds54654sdfdfdsfvbds',
    path: {
        controller: path.resolve('./modules/controllers'),
        model: path.resolve('./modules/models'),
        transform: path.resolve('./modules/transform'),
    }
}
