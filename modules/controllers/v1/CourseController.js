const Controller = require(`${config.path.controller}/Controller`)
const CourseTransform = require(`${config.path.transform}/CourseTransform`)

module.exports = new class CourseController extends Controller {
    index(req, res) {
        this.model.Course.find()
            .then(function (courses) {
                if (courses) {
                    return res.status(200).json({
                        status : 200,
                        data : new CourseTransform().transformCollection(courses)
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
