const express = require('express')
const router = express.Router()
const ControllerApi = config.path.controller

// User Controllers
const HomeController = require(`${ControllerApi}/v1/HomeController`)
const CourseController = require(`${ControllerApi}/v1/CourseController`)

// User Router
router.get('/', HomeController.index)
router.get('/courses', CourseController.index.bind(CourseController))


// Admin Controllers
const AdminCourseController = require(`${ControllerApi}/v1/admin/CourseController`)

// Validation Controller
const validate= require(`${ControllerApi}/v1/ValidationController`)
// Admin Router
const adminRouter = express.Router()
adminRouter.get('/courses',AdminCourseController.index.bind(AdminCourseController) )
adminRouter.get('/courses/:id',AdminCourseController.info.bind(AdminCourseController))
adminRouter.post('/courses', validate.storeCourse , AdminCourseController.store.bind(AdminCourseController))
adminRouter.put('/courses/:id', AdminCourseController.update.bind(AdminCourseController))
adminRouter.delete('/courses/:id', AdminCourseController.destroy.bind(AdminCourseController))

router.use('/admin', adminRouter)


module.exports = router