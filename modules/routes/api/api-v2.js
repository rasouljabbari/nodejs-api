const express = require('express')

const router = express.Router()

router.get('/', (req,res) => {
    res.json('welcome to Api version 2')
})

module.exports = router