const signup = require("./signup.controller.js");
const getMe = require("./getMe.controller.js");
const login = require("./login.controller.js");
const getUserByUserId = require("./getUserByUserId.controller.js");

module.exports = {
    signup,
    getMe,
    login,
    getUserByUserId
}