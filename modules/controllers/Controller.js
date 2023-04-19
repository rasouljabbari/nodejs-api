// Models
const Course = require('./../models/course');
const {validationResult} = require("express-validator");

module.exports = class Controller {
    constructor() {
        this.model = {Course}
    }

    //Show Errors For Validation Rules
    showValidationErrors(req , res , callback) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(
                {
                    errors: errors.array().map(error => {
                        return {
                            'field' : error.path,
                            'message' : error.msg,
                        }
                    }),
                    success:false });
        }
    }
}
