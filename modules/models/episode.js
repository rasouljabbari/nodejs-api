const mongoose = require('mongoose');
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');

const EpisodesSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    videoUrl: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true
    },
    viewCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
})

EpisodesSchema.plugin(timestamps)
EpisodesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Episodes', EpisodesSchema)
