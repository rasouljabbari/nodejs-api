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
        // this.model.Course.find({}).populate('episodes')
            .then(function (data) {
                res.status(200).json(responseHandler('course list', data))
            })
            .catch(err => {
                throw err
            })
    }

    async info(req, res) {
        try {
            const course = await this.model.Course.findById(req.params.id)
            if (course) {
                return res.status(200).json(responseHandler('course info', course))
            } else {
                return res.status(404).json({
                    error: 'دوره مورد نظر وجود ندارد',
                    success: false
                })
            }
        } catch (err) {
            return this.serverErrorHandler(err, req, res)
        }
    }

    async store(req, res) {

        try {
            const {title, body, price} = req.body;

            // Validation and Show errors
            if (this.showValidationErrors(req, res))
                return;

            let user = await this.model.User.findById(req.body.user_id)
            const uri = config.NODE_ENV === 'dev' ? `http://localhost:${config.port}/` : config.site_uri
            const newCourse = await this.model.Course.create({
                title,
                body,
                price,
                image: uri + req.file.path.replace(/\\/g, '/')
            })

            user.courses.push(newCourse?._id)
            user.save()

            res.status(201).json(responseHandler('دوره با موفقیت افزوده شد', newCourse))
        } catch (error) {
            this.serverErrorHandler(error, req, res)
        }
    }

    async update(req, res) {
        const uri = config.NODE_ENV === 'dev' ? `http://localhost:${config.port}/` : config.site_uri

        let body = req.file ? {
            image: uri + req.file.path.replace(/\\/g, '/'),
            ...req.body
        } : {...req.body}

        try {
            // return
            const updatedUser = await this.model.Course.findByIdAndUpdate(req.params.id, body)
            if (updatedUser) {
                const user = await this.model.Course.findById(req.params.id)
                return res.status(200).json(responseHandler('دوره با موفقیت آپدیت شد', user))
            } else {
                return res.status(404).json({
                    error: 'دوره مورد نظر وجود ندارد',
                    success: false
                })
            }

        } catch (err) {
            return this.serverErrorHandler(err, req, res)
        }
    }

    async destroy(req, res) {

        try {
            const deletedCourse = await this.model.Course.findByIdAndRemove(req.params.id)
            if (deletedCourse) {
                return res.status(200).json(responseHandler('دوره با موفقیت حذف شد', []))
            } else {
                return res.status(404).json({
                    error: 'دوره مورد نظر وجود ندارد',
                    success: false
                })
            }

        } catch (err) {
            return this.serverErrorHandler(err, req, res)
        }
    }

}
