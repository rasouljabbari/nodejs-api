const Controller = require(`${config.path.controller}/Controller`)
const UserTransform = require(`${config.path.transform}/UserTransform`)

module.exports = new class UserController extends Controller {
    async index(req, res) {

        let user = await this.model.User.findById(req.query.id)

        return res.status(200).json({
            success: true,
            user: new UserTransform().transform(user)
        })
    }

}
