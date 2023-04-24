const Controller = require(`${config.path.controller}/Controller`)

const responseHandler = (message, data) => {
    return {
        message,
        data
    }
}

module.exports = new class AuthController extends Controller {
    async register(req, res) {

        try {
            const {name, email, password} = req.body;

            // Validation and Show errors
            if (this.showValidationErrors(req, res)) return;

            // Check if user with this email already exists
            const existingUser = await this.model.User.findOne({email});
            if (existingUser) {
                return res.status(409).json({
                    errors: [
                        {
                            'field': 'email',
                            'message': 'ایمیل نمی تواند تکراری باشد',
                        }
                    ],
                    success: false
                })
            }

            // Create new user
            const newUser = await this.model.User.create({name, email, password});
            res.status(201).json(responseHandler('ثبت نام با موفقیت انجام شد', newUser))

        } catch (error) {
            this.serverErrorHandler(error, req, res)
        }

    }

// login(req, res) {
//     res.json('login')
// }

}
