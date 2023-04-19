const Controller = require('../../Controller')
const responseHandler = (text, data) => {
    return {
        text,
        data
    }
}

module.exports = new class CourseController extends Controller {
    index(req, res) {
        this.model.Course.find()
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

    store(req, res) {
        if (this.showValidationErrors(req, res)) return;

        this.model.Course.insertMany([
            {
                title: req.body.title,
                body: req.body.body,
                price: req.body.price,
                image: req.body.image,
            }
        ])
            .then((data) => {
                res.status(201).json(responseHandler('created course', data))
            })
    }

    update(req, res) {
        this.model.Course.findByIdAndUpdate(
            req.params.id,
            {
                title: 'www-url-form-encoded'
            }).then(data => {
            res.status(200).json(responseHandler('updated course', data))
        }).catch(err => res.json(err))
    }

    destroy(req, res) {
        this.model.Course.findByIdAndRemove(
            req.params.id).then(() => {
            res.status(200).json(responseHandler('delete course', []))
        }).catch(err => res.json(err))
    }

}
