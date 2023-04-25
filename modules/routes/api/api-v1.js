const express = require('express')
const router = express.Router()
const ControllerApi = config.path.controller


// Validation Controller
const validationRules = require(`${ControllerApi}/v1/ValidationController`)

// middlewares
const {uploadImage} = require("../../middlewares/uploadMiddleware");
const apiAuth = require("../../middlewares/apiAuth");
const apiAdmin = require("../../middlewares/apiAdmin");

// User Controllers
const HomeController = require(`${ControllerApi}/v1/HomeController`)
const CourseController = require(`${ControllerApi}/v1/CourseController`)
const EpisodeController = require(`${ControllerApi}/v1/EpisodeController`)
const AuthController = require(`${ControllerApi}/v1/AuthController`)
const UserController = require(`${ControllerApi}/v1/UserController`)
// Admin Controllers
const AdminCourseController = require(`${ControllerApi}/v1/admin/CourseController`)
const AdminEpisodeController = require(`${ControllerApi}/v1/admin/EpisodeController`)

const multer = require('multer');
const upload = multer();

// user
router.get('/', HomeController.index)

router.post('/register', validationRules.register, uploadImage.single('profile'), AuthController.register.bind(AuthController))

router.post('/login',upload.none(), AuthController.login.bind(AuthController))
router.get('/users', apiAuth, UserController.list.bind(UserController))
router.get('/user', apiAuth, UserController.index.bind(UserController))

router.get('/courses', CourseController.index.bind(CourseController))
router.get('/episodes/:id', EpisodeController.single.bind(EpisodeController))

router.post('/user/profile', apiAuth, uploadImage.single('image'), UserController.uploadImage.bind(UserController))


// admin
const adminRouter = express.Router()
adminRouter.get('/courses', AdminCourseController.index.bind(AdminCourseController))
adminRouter.get('/courses/:id', AdminCourseController.info.bind(AdminCourseController))
adminRouter.post('/courses',uploadImage.single('image'), validationRules.storeCourse, AdminCourseController.store.bind(AdminCourseController))
adminRouter.put('/courses/:id',uploadImage.single('image'), AdminCourseController.update.bind(AdminCourseController))
adminRouter.delete('/courses/:id', AdminCourseController.destroy.bind(AdminCourseController))

adminRouter.get('/episodes', AdminEpisodeController.index.bind(AdminEpisodeController))
adminRouter.get('/episodes/:id', AdminEpisodeController.single.bind(AdminEpisodeController))
adminRouter.post('/episodes',upload.none(), validationRules.storeEpisode, AdminEpisodeController.store.bind(AdminEpisodeController))
adminRouter.put('/episodes/:id', AdminEpisodeController.update.bind(AdminEpisodeController))
adminRouter.delete('/episodes/:id', AdminEpisodeController.destroy.bind(AdminEpisodeController))


router.use('/admin', apiAuth, apiAdmin, adminRouter)


module.exports = router
