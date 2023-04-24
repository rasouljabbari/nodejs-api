const {verify} = require('jsonwebtoken')

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization')
        if (token) {
            token = token.slice(7)
            verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: 'توکن وارد شده معتبر نیست',
                        success: false
                    })
                } else {
                    next()
                }
            })
        } else {
            return res.status(403).json({
                message: 'شما به این بخش دسترسی ندارید',
                success: false
            })
        }
    }
}