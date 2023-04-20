const mongoose = require('mongoose');
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp');

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    courses: [
        {
            type: Schema.Types.ObjectId, ref: 'Course'
        }
    ]
})

UserSchema.plugin(timestamps)

module.exports = mongoose.model('User', UserSchema)
