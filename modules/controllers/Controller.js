// Models
const Course = require('./../models/course');
const User = require('./../models/user');
const {validationResult} = require("express-validator");

const sendErrorDev = (err, res) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        status: statusCode,
        message: err.message,
        stack: err.stack
    })
}
const sendErrorProd = (err, res) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        status: statusCode,
        message: "Something went very wrong!",
    })
}

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
                    errors: errors.array({onlyFirstError: true}).map(error => {
                        return {
                            'field': error.path,
                            'message': error.msg,
                        }
                    }),
                    success: false
                });
        }
    }

    serverErrorHandler(err, req, res) {
        // Set status code and error message
        if (config.NODE_ENV === 'dev') {
            sendErrorDev(err, res)
        } else {
            sendErrorProd(err, res)
        }
    }
}
