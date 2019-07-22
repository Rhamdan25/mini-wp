const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const {authenticate} = require("../middlewares/auth")

router.post("/register", userController.register)
router.post("/login", userController.login)
// router.post("/login/google", userController.googleSignin)
// router.get("/all", userController.findAll)


module.exports = router
