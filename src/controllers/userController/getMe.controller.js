const queryFn = require('../../utils/queryFunction');

const _getUserById =
    `SELECT 
        user_id, 
        first_name, 
        last_name, 
        email, 
        phone_no, 
        created_at, 
        role
    FROM 
        users 
    WHERE
        user_id = ?
    AND 
        is_archived = 0`;


const getMe = async(req, res) => {
    const { user_id } = req.user;
    try {
        const result = await queryFn(_getUserById, [user_id]);
        if (result.length === 0) {
            return res.status(404).send("User not found");
        }
        res.json(result[0]);
    } catch (err) {
        console.error("Error fetching employee:", err);
        return res.json(errorResponse(400, "Something went wrong."));
    }
};

module.exports = getMe;