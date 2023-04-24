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

    uploadImage(req, res) {
        if (req.file) {
            const uri = config.NODE_ENV === 'dev' ? `http://localhost:${config.port}/` : config.site_uri
            res.json({
                message: 'فایل شما با موفقیت آپلود شد',
                data: {
                    imagePath: uri + req.file.path.replace(/\\/g, '/')
                },
                success: true
            })
        } else {
            this.customError(res, 400, 'image', 'فایل بارگزاری نشد!')
        }
    }

}
