const Controller = require(`${config.path.controller}/Controller`);
const EpisodeTransform = require(`${config.path.transform}/v1/EpisodeTransform`);

module.exports = new class EpisodeController extends Controller {
    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();

        if(this.showValidationErrors(req, res)) 
            return;

        this.model.Episode.findById(req.params.id).populate('Course').exec((err, episode) => {
            if (err) throw err;

            if (episode) {
                return res.json({
                    data: new EpisodeTransform().transform(episode),
                    success: true
                });
            }

            res.json({
                message: 'episode empty',
                success: false
            })
        })
    }
}