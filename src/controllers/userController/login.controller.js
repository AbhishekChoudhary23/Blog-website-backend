const queryFn = require("../../utils/queryFunction");
const { comparePassword } = require("../../utils/bcryptHashing");
const generateToken = require("../../utils/generateToken");
const { errorResponse, successResponse } = require("../../utils/customResponse");


const _loginUser = `
    SELECT 
        user_id, 
        password, 
        id, 
        email,
        role
    FROM 
        users 
    WHERE 
        user_id = ?`;


const login = async(req, res, next) => {
    const { userId, password } = req.body;

    try {
        const [user] = await queryFn(_loginUser, [userId]);
        console.log(user);
        if (!user) {
            return res.json(errorResponse(401, "Invalid user_id or password"));
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.json(errorResponse(401, "Invalid user_id or password")); // throw exception error
        }

        // Use the generateToken function to create a token
        const token = generateToken(user);

        const payload = { role: user.role, userId: user.user_id, email: user.email, id: user.id }
        res.json(successResponse(200, "Login successful", { user: payload, token }));
    } catch (error) {
        return next(error);
    }
};
module.exports = login;