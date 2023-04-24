const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
global.config = require('./modules/config')

// connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/myDB')
mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({type: 'application/json'}))
app.use('/public', express.static('public'))

const webRouter = require('./modules/routes/web')
const apiRouter = require('./modules/routes/api')

app.use('/api', apiRouter)
app.use('/', webRouter)

app.listen(config.port, () => {
    console.log(`Server running at Port ${config.port}`)
})
