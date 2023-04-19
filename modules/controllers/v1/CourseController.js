const Controller = require(`${config.path.controller}/Controller`)

module.exports = new class CourseController extends Controller {
    index(req, res) {
        this.model.Course.find()
            .then(function (courses) {
                if (courses) {
                    res.status(200).json({
                        status : 200,
                        data: courses.map(course => {
                            return {
                                title : course?.title,
                                body : course?.body,
                                price : course?.price,
                            }
                        })
                    })
                }
                res.status(200).json({
                    status : 200,
                    message : 'course is empty'
                })
            })
            .catch(err => {
                throw err
            })
    }

}
