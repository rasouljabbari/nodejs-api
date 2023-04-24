const path = require('path')

module.exports = {
    port: 8000,
    NODE_ENV : 'dev',
    site_uri : 'http://localhost:8000',
    secret : 'sadfde#@efewfef4678$%Gfdgf$$%%fgNBHNGNngMjkj45fn7gngfn',
    path: {
        controller: path.resolve('./modules/controllers'),
        model: path.resolve('./modules/models'),
        transform: path.resolve('./modules/transform'),
    }
}
