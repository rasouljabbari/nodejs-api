const express = require('express')
const router = express.Router()
const ControllerApi = config.path.controller
const {checkToken} = require("../../middlewares/checkToken");

// Validation Controller
const validationRules = require(`${ControllerApi}/v1/ValidationController`)

// User Controllers
const AuthController = require(`${ControllerApi}/v1/AuthController`)
const HomeController = require(`${ControllerApi}/v1/HomeController`)
const CourseController = require(`${ControllerApi}/v1/CourseController`)
const UserController = require(`${ControllerApi}/v1/UserController`)

// User
router.post('/register', validationRules.register, AuthController.register.bind(AuthController))
router.post('/login', AuthController.login.bind(AuthController))
router.use(checkToken)

// user

router.get('/', HomeController.index)
router.get('/courses', CourseController.index.bind(CourseController))
router.get('/user', UserController.index.bind(UserController))
// Admin
const AdminCourseController = require(`${ControllerApi}/v1/admin/CourseController`)

// admin
const adminRouter = express.Router()
adminRouter.get('/courses', AdminCourseController.index.bind(AdminCourseController))
adminRouter.get('/courses/:id', AdminCourseController.info.bind(AdminCourseController))
adminRouter.post('/courses', validationRules.storeCourse, AdminCourseController.store.bind(AdminCourseController))
adminRouter.put('/courses/:id', AdminCourseController.update.bind(AdminCourseController))
adminRouter.delete('/courses/:id', AdminCourseController.destroy.bind(AdminCourseController))
router.use('/admin', adminRouter)


module.exports = router
