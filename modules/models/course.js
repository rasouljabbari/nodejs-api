const mongoose = require('mongoose');
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');

const CourseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    episodes: [
        {
            type: Schema.Types.ObjectId, ref: 'Episodes'
        }
    ]
})

CourseSchema.plugin(timestamps)
CourseSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Course', CourseSchema)
