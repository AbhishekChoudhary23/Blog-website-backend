const { postSchema } = require("../../middleware/joiValidation");
const { errorResponse, successResponse } = require("../../utils/customResponse");
const queryFn = require("../../utils/queryFunction");

const _createPost =
    `INSERT INTO posts (
        title,
        content,
        topics,
        created_by
        )
        VALUES ?;
`;

const createPost = async(req, res, next) => {
    const { id, role, user_id } = req.user;
    const { title, content, topics } = req.body;

    if (role !== 'ADMIN') {
        return res.json(errorResponse(403, "Access denied. Only admins can create posts."));
    }

    const values = [
        [title, content, JSON.stringify(topics), id]
    ];

    try {
        const result = await queryFn(_createPost, [values]);
        if (result.affectedRows === 0) {
            return res.json(errorResponse(404, "Post could not be created. Please check your input."));
        }
        res.json(successResponse(201, "Post created successfully", {
            post: {
                title: title,
                content: content,
                topics: JSON.parse(JSON.stringify(topics)), // Ensure topics is an array
                created_by: user_id
            }
        }));
    } catch (err) {
        console.error("Error fetching user:", err);
        return res.json(errorResponse(400, "Something went wrong."));
    }
};

module.exports = createPost;