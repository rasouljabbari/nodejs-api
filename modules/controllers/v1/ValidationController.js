const {check} = require('express-validator');

module.exports = {
    storeCourse: [
        check('title')
            .notEmpty().trim().escape()
            .withMessage('وارد کردن عنوان اجباری است.').isLength({min: 5})
            .withMessage('عنوان حداقل می بایست 5 کاراکتر باشد.'),

        check('body')
            .notEmpty().trim().escape()
            .withMessage('وارد کردن توضیحات اجباری است.'),

        check('price')
            .notEmpty().trim().escape().withMessage('وارد کردن قیمت دوره اجباری است.')
            .isInt().withMessage('قیمت دوره باید بصورت عدد وارد شود'),

        check('image')
            .notEmpty().trim().escape().withMessage('بارگزاری عکس دوره اجباری است.'),
    ],
    register: [
        check('name')
            .notEmpty().trim().escape().withMessage('وارد کردن نام و نام خانوادگی اجباری است.')
            .isLength({min: 5}).withMessage('نام و نام خانوادگی حداقل می بایست 5 کاراکتر باشد.'),

        check('email')
            .notEmpty().trim().escape()
            .withMessage('وارد کردن ایمیل اجباری است.')
            .isEmail().withMessage('فرمت ایمیل معتبر نیست'),

        check('password')
            .notEmpty().trim().escape().withMessage('وارد کردن رمز اجباری است.')
            .isLength({min: 8}).withMessage('حداقل تعداد رمز 8 رقم می باشد'),
    ],
    storeEpisode: [
        check('title')
            .notEmpty().trim().escape()
            .withMessage('وارد کردن عنوان اجباری است.'),

        check('body')
            .notEmpty().trim().escape()
            .withMessage('وارد کردن توضیحات اجباری است.'),

        check('videoUrl')
            .notEmpty().trim().escape().withMessage('وارد کردن آدرس ویدیو اجباری است.'),

        check('number')
            .notEmpty().withMessage('وارد کردن شماره جلسه اجباری است.'),

    ],
}
