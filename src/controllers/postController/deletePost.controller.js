const { errorResponse, successResponse } = require("../../utils/customResponse");
const queryFn = require("../../utils/queryFunction");

const _deletePost =
    `UPDATE 
        posts 
    SET 
        deleted_at = current_timestamp,
        is_archived = true
    WHERE 
        post_id = ? AND created_by = ? AND is_archived = 0`;

const deletePost = async(req, res) => {
    const { id, role } = req.user;
    const { post_id } = req.params;

    try {
        const result = await queryFn(_deletePost, [post_id, id]);
        if (result.affectedRows === 0) {
            return res.json(errorResponse(404, "Post not found"));
        }
        res.json(successResponse(200, "Post deleted successfully", result[0]));
    } catch (err) {
        console.error("Error deleting the post:", err);
        return res.json(errorResponse(400, "Something went wrong."));
    }
};

module.exports = deletePost;