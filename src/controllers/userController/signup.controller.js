const queryFn = require("../../utils/queryFunction");
const { passwordHash } = require('../../utils/bcryptHashing');
const generateToken = require("../../utils/generateToken");
const { successResponse, errorResponse } = require("../../utils/customResponse");

const existingUser = `
    SELECT 
        email 
    FROM 
        users 
    WHERE 
        email = ?;
`;

const _signupUserQuery =
    `INSERT INTO 
            users (
            user_id,
            first_name, 
            last_name, 
            email, 
            phone_no,
            role,
            password) 
    VALUES 
        (?);
`;

const getUserById = `
    SELECT 
        user_id, 
        first_name, 
        last_name, 
        email, 
        phone_no, 
        role 
    FROM 
        users 
    WHERE 
        user_id = ?; 
`;


const signup = async(req, res, next) => {
    const { userId, firstName, lastName, email, phoneNo, role, password } = req.body; // fix to camelCase


    try {
        const [checkExistingUser] = await queryFn(existingUser, [email]);
        if (checkExistingUser) {
            return res.json(errorResponse(400, "User already Exists with this email.")); // fix to response, throw error
        }

        const hashedPassword = await passwordHash(password);
        const values = [
            [userId, firstName, lastName, email, phoneNo, role, hashedPassword],
        ];

        await queryFn(_signupUserQuery, values);

        const [user] = await queryFn(getUserById, [userId]); // Get user by userId

        if (!user) {
            return res.send(errorResponse(403, "User not found after registration."));
        }

        const token = generateToken(user); // Use the first user object for token generation

        const payload = { role: user.role, userId: user.user_id, email: user.email, id: user.id }
        res.json(successResponse(201, "User and Token created successfully", { user: payload, token }));

    } catch (error) {
        return next(error);
    }
};

module.exports = signup;