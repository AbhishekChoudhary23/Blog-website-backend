const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const validator = require('../utils/validator')

const {
    signup,
    getMe,
    login,
    getUserByUserId
} = require('../controllers/userController')
const { userSchema, loginSchema } = require('../middleware/joiValidation');


router.post("/login", validator(loginSchema), login); // login route
router.post("/signup", validator(userSchema), signup); // signup route
router.get("/getme", authenticateToken, getMe); // getMe route
router.get("/:user_id", getUserByUserId);

module.exports = router;