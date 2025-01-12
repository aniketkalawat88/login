const express = require("express");
const router = express.Router();

const authController = require("../controller/auth-controller");
const authMiddleware = require("../middleware/auth_middleware");

router.route("/login").get(authController.loginGet);


router.post("/login", authController.login);


router.post("/register", authController.register);

router.route("/user").get(authMiddleware, authController.user);


module.exports = router;