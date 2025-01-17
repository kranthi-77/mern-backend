const express = require('express')
const authControllers = require('../controllers/auth-controller')
const validate = require('../middlewares/validate-middleware')
const { signupSchema,loginSchema } = require('../validators/auth-validator')
const authMiddleware = require('../middlewares/auth-middlewares')
const router=express.Router()


router
.route('/register')
.post(validate(signupSchema), authControllers.register)
router.route("/login").post(validate(loginSchema), authControllers.login)
router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router
