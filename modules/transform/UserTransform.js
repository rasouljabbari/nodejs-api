const Transform = require('./Transform')
const jwt = require('jsonwebtoken');
module.exports = class UserTransform extends Transform {

    transform(item, createToken = false) {
        console.log(item)
        this.createToken = createToken
        return {
            name: item?.name,
            email: item?.email,
            ...this.withToken(item)
        }
    }

    withToken(item) {
        if (item.token) return {token: item.token}

        if (this.createToken) {
            let payload = {user_id: item?._id}
            let token = jwt.sign(payload, config.secret, {
                expiresIn: '72h'
            })

            return {token}
        }

        return {}

    }

}
