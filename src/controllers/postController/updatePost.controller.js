const { errorResponse, successResponse } = require("../../utils/customResponse");
const queryFn = require("../../utils/queryFunction");

const _updatePost = `
    UPDATE 
        posts
    SET 
        title = ?, 
        content = ?, 
        topics = ?
    WHERE 
        post_id = ? 
        AND created_by = ? 
        AND is_archived = 0;` // can remove created_by


const updatePost = async(req, res) => {
    const { id, role } = req.user;
    const { post_id } = req.params;
    const { title, content, topics } = req.body;

    if (role !== 'ADMIN') {
        return res.json(errorResponse(403, "Access denied. Only admins can delete posts."));
    }

    try {
        const result = await queryFn(_updatePost, [title, content, JSON.stringify(topics), post_id, id]);
        if (result.affectedRows === 0) {
            return res.json(errorResponse(400, "Post not found"));
        }
        res.json(successResponse(200, "Post Updated successfully"));
    } catch (err) {
        console.error("Error updating the post:", err);
        return res.json(errorResponse(400, "Something went wrong."));
    }
};

module.exports = updatePost;