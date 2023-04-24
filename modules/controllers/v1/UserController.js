const Controller = require(`${config.path.controller}/Controller`)
const UserTransform = require(`${config.path.transform}/v1/UserTransform`)

const responseHandler = (message, data) => {
    return {
        message,
        data
    }
}

module.exports = new class UserController extends Controller {

    list(req, res) {
        this.model.User.find({}).populate('courses')
            .then(function (data) {
                let users = data.map((item) =>(
                    {
                        id : item._id,
                        name : item.name,
                        email : item.email,
                        courses : item.courses,
                    }
                ))
                res.status(200).json(responseHandler('users', users))
            })
            .catch(err => {
                throw err
            })
    }
    index(req, res) {
        return res.status(200).json({
            success: true,
            user: new UserTransform().transform(req.user)
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
