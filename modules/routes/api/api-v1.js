const express = require('express')
const router = express.Router()
const ControllerApi = config.path.controller

// Home Controller
const HomeController = require(`${ControllerApi}/v1/HomeController`)
// Home Router
router.get('/', HomeController.index)

// Admin Controller
const AdminCourseController = require(`${ControllerApi}/v1/admin/CourseController`)
// Admin Router
const adminRouter = express.Router()
adminRouter.get('/courses',AdminCourseController.index.bind(AdminCourseController) )
adminRouter.get('/courses/:id', AdminCourseController.info.bind(AdminCourseController))
adminRouter.post('/courses', AdminCourseController.store.bind(AdminCourseController))
adminRouter.put('/courses/:id', AdminCourseController.update.bind(AdminCourseController))
adminRouter.delete('/courses/:id', AdminCourseController.destroy.bind(AdminCourseController))

router.use('/admin', adminRouter)


module.exports = router