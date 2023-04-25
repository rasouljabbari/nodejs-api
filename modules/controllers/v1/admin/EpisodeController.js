const Controller = require(`${config.path.controller}/Controller`);
const EpisodeTransform = require(`${config.path.transform}/v1/EpisodeTransform`);

const responseHandler = (message, data) => {
    return {
        message,
        data
    }
}

module.exports = new class EpisodeController extends Controller {
    index(req , res) {

        const page = req.query.page || 1;
        this.model.Episode.paginate({} , { page , limit : 2 })
        .then(result => {
            if(result) {
                res.json({
                    data : new EpisodeTransform().withPaginate().transformCollection(result),
                    success : true
                });
            }
        })
        .catch(err => console.log(err));
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();

        if(this.showValidationErrors(req, res)) 
            return;

        this.model.Episode.findById(req.params.id , (err , episode) => {
            if(episode) {
                return res.json({
                    episode,
                    success : true
                })
            }

            res.status(404).json({
                data : 'not found',
                success : false
            })
        })
    }

    async store(req , res) {
        const {title, body, videoUrl, number,viewCount,commentCount } = req.body;

        // Validation and Show errors
        if(this.showValidationErrors(req, res)) 
            return;

        let course = await this.model.Course.findById(req.body.course_id)

        if(course) {
            let newEpisode = await this.model.Episode.create({
                course : course._id,
                title,
                body,
                videoUrl,
                number,
                viewCount,
                commentCount
            });
            if(newEpisode) {
                course.episodes.push(newEpisode?._id)
                course.save()

                return res.status(201).json(responseHandler('ویدیو با موفقیت افزوده شد', newEpisode))
            }
        }

    }


    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        
        if(this.showValidationErrors(req, res)) 
            return;

        this.model.Episode.findByIdAndUpdate(req.params.id , { 
            title : 'episode 1'
        }, (err , episode) => {
            if(err) throw err;

            if(episode) {
                return res.json({
                    data : 'ویدیو با موفقیت آپدیت شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین ویدیویی وجود ندارد',
                success : false
            });
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        
        if(this.showValidationErrors(req, res)) 
            return;

        this.model.Episode.findById(req.params.id).populate('course').exec((err , episode) => {
            if(err) throw err;
            
            if(episode) {
                let course = episode.course;
                let pos = course.episodes.indexOf(episode._id);
                course.episodes.splice(pos , 1);
                course.save(err => {
                    if(err) throw err;

                    episode.remove();
                    res.json({
                        data : 'ویدیو شما با موفقیت حذف شد',
                        success : true
                    });
                });
                return;
            }

            res.status(404).json({
                data : 'چنین ویدیویی وجود ندارد',
                success : true
            });
        })
    }
}