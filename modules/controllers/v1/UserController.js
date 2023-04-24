const Controller = require(`${config.path.controller}/Controller`)

module.exports = new class UserController extends Controller {
    index(req, res) {
        return res.json('user 1')
    }

}
