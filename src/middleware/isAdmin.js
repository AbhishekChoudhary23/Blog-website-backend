const { errorResponse } = require("../utils/customResponse");

const isAdmin = (req, res, next) => {
    const { role } = req.user;

    if (role === 'ADMIN') {
        next();
    } else {
        return res.json(errorResponse(403, "Access denied. Only admins can perform this action."));
    }
};

module.exports = isAdmin;