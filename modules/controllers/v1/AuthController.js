const Controller = require(`${config.path.controller}/Controller`)
const bcrypt = require('bcrypt');
const UserTransform = require(`${config.path.transform}/v1/UserTransform`)
const responseHandler = (message, data) => {
    return {
        message,
        data
    }
}

module.exports = new class AuthController extends Controller {
    async register(req, res) {

        try {
            const {name, type, email, password} = req.body;
            const uri = config.NODE_ENV === 'dev' ? `http://localhost:${config.port}/` : config.site_uri

            // Validation and Show errors
            if(this.showValidationErrors(req, res)) 
            return;

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
            const newUser = await this.model.User.create({
                name,
                email,
                password,
                type,
                profile : uri + req.file.path.replace(/\\/g, '/')
            });
            return res.status(201).json(responseHandler('ثبت نام با موفقیت انجام شد', newUser))

        } catch (error) {
            this.serverErrorHandler(error, req, res)
        }

    }

    async login(req, res) {
        try {
            const {email, password} = req.body;

            // Validation and Show errors
            if(this.showValidationErrors(req, res)) 
            return;

            const existingUser = await this.model.User.findOne({email});

            if (!existingUser) {
                return res.status(422).json({
                    'message': 'اطلاعات وارد شده صحیح نیست!',
                    success: false
                })
            }

            bcrypt.compare(password, existingUser?.password, (err, status) => {
                if (!status) {
                    return res.status(422).json({
                        'message': 'رمز وارد شده صحیح نیست!',
                        success: false
                    })
                }

                return res.status(200).json(responseHandler('ورورد با موفقیت انجام شد', new UserTransform().transform(existingUser, true)))
            })


        } catch (error) {
            this.serverErrorHandler(error, req, res)
        }
    }

}
