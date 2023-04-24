const Controller = require(`${config.path.controller}/Controller`)
// const CourseTransform = require(`${config.path.transform}/v1/CourseTransform`)

module.exports = new class CourseController extends Controller {
    index(req, res) {
        const page = req.query.page || 1
        this.model.Course.paginate({}, {page, limit: 2, populate: ['episodes']})
            .then(result => {
                if (result) {
                    return res.json({
                        // data: new CourseTransform(this.wit hEpisodesStatus).withPaginate().transformCollection(result),
                        data: result,
                        success: true
                    });
                }

                res.json({
                    message: 'Courses empty',
                    success: false
                })
            })
            .catch(err => console.log(err));
    }

}
