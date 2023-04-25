// Models
const Course = require('./../models/course');
const User = require('./../models/user');
const Episode = require('./../models/episode');
const {validationResult} = require("express-validator");

const sendErrorDev = (err, res) => {
    console.log(err, res)
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
        this.model = {Course,Episode, User}
    }

    //Show Errors For Validation Rules
    showValidationErrors(req, res) {
        let body = req.body
        if(req.file) {
            body = {
                ...req.body,
                ...req.file,
            }
        }

        const errors = validationResult(body);
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

    customError(res, statusCode, field, message) {
        return res.status(statusCode).json(
            {
                errors: [
                    {
                        field,
                        message
                    }],
                success: false
            });
    }
}
