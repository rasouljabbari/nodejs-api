// Models
const Course = require('./../models/course');
const User = require('./../models/user');
const {validationResult} = require("express-validator");

module.exports = class Controller {
    constructor() {
        this.model = {Course, User}
    }

    //Show Errors For Validation Rules
    showValidationErrors(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(
                {
                    errors: errors.array({ onlyFirstError: true }).map(error => {
                        return {
                            'field': error.path,
                            'message': error.msg,
                        }
                    }),
                    success: false
                });
        }
    }
}
