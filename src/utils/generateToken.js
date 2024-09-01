const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        role: user.role,
        user_id: user.user_id,
        email: user.email,
        id: user.id
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRATION_TIME
    });

    return token;
};

module.exports = generateToken;