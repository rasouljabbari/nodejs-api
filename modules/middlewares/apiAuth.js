const jwt = require('jsonwebtoken');
const User = require(`${config.path.model}/user`);

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization
    let token = authorization?.slice(7)

    if (token) {
        return jwt.verify(token, config.secret, async (err, decode) => {
            if (err) {
                return res.json({
                    success: false,
                    data: 'Failed to authenticate token.'
                })
            }

            const user = await User.findById(decode.user_id)


            if (user) {
                user.token = token;
                req.user = user;
                next();
            } else {
                return res.json({
                    success: false,
                    data: 'User not found'
                });
            }

            // next();
            // return;
        })
    }

    return res.status(403).json({
        data: 'No Token Provided',
        success: false
    })
}