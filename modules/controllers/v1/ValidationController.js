const {check} = require('express-validator');

exports
    .storeCourse = [
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
];
