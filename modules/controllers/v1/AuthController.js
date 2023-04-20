const Controller = require(`${config.path.controller}/Controller`)

module.exports = new class AuthController extends Controller {
    register(req, res) {

        // Validation and Show errors
        if (this.showValidationErrors(req, res)) return;

        res.json('gregregr')

        //

        // success

        // this.model.Course.insertMany([
        //     {
        //         title: req.body.title,
        //         body: req.body.body,
        //         price: req.body.price,
        //         image: req.body.image,
        //     }
        // ])
        //     .then((data) => {
        //         res.status(201).json(responseHandler('created course', data))
        //     })
    }
    // login(req, res) {
    //     res.json('login')
    // }

}
