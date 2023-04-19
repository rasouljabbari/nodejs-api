const express = require('express')

const router = express.Router()

router.get('/', (req,res) => {
    res.json('welcome to Home page')
})
router.get('/about', (req,res) => {
    res.json('welcome to About page')
})

module.exports = router