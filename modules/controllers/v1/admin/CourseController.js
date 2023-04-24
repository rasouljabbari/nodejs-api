const Controller = require('../../Controller')
const responseHandler = (message, data) => {
    return {
        message,
        data
    }
}

module.exports = new class CourseController extends Controller {
    index(req, res) {
        const page = req.query.page || 1
        this.model.Course.paginate({}, {page, limit: 2, populate: ['episodes']})
            .then(function (data) {
                res.status(200).json(responseHandler('course list', data))
            })
            .catch(err => {
                throw err
            })
    }

    info(req, res) {
        this.model.Course.findById(req.params.id).then(data => {
            res.status(200).json(responseHandler('course info', data))
        }).catch(err => res.json(err))
    }

    async store(req, res) {

        try {
            const {title, body, price, image} = req.body;

            // Validation and Show errors
            this.showValidationErrors(req, res)

            let user = await this.model.User.findById(req.body.user_id)
            console.log("User id : ", user._id)

            const newCourse = await this.model.Course.create({
                title,
                body,
                price,
                image
            })

            user.courses.push(newCourse?._id)
            user.save()

            res.status(201).json(responseHandler('دوره با موفقیت افزوده شد', newCourse))
        } catch (error) {
            this.serverErrorHandler(error, req, res)
        }
    }

    update(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();

        this.showValidationErrors(req, res)

        this.model.Course.findByIdAndUpdate(
            req.params.id,
            {
                title: 'www-url-form-encoded'
            }).then(data => {
            res.status(200).json(responseHandler('updated course', data))
        }).catch(err => res.json(err))
    }

    destroy(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();

        this.showValidationErrors(req, res)

        this.model.Course.findByIdAndRemove(
            req.params.id).then(() => {
            res.status(200).json(responseHandler('delete course', []))
        }).catch(err => res.json(err))
    }

}
