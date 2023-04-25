const multer = require('multer')
const {mkdirp} = require('mkdirp')

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let day = new Date().getDay()
        let dir = `./public/uploads/images/${year}/${month}/${day}`

        mkdirp.sync(dir)
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/ /g, '-'))
    }
})

const imageFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp') {
        cb(null, true)
    } else cb(null, false)
}

const uploadImage = multer({
    storage: imageStorage,
    fileFilter : imageFilter,
    limits: {
        // 1024 * 1024 = 1MB
        // 1024 * 1024 * 10 = 10MB

        fileSize : 1024 * 1024 * 10
    }
})

module.exports = {
    uploadImage,
}