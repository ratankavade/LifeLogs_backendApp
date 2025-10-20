const express = require("express");
const { userRegistration, userLogin, userProfile, getAllUser, userLogout } = require("../controllers/userController");
const router = express.Router();
const authHandler = require("../middlewares/authMiddleware");

router.post("/register", userRegistration);

router.post("/login", userLogin);

router.post("/logout", authHandler, userLogout)

router.get("/profile", authHandler, userProfile);

router.get("/allUsers", authHandler, getAllUser)

module.exports = router;