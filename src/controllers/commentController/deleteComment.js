const { errorResponse, successResponse } = require("../../utils/customResponse");
const queryFn = require("../../utils/queryFunction");


const adminDeleteCommentSql = `
    UPDATE 
        comments
    SET 
        deleted_at = CURRENT_TIMESTAMP, 
        is_archived = TRUE
    WHERE 
        comment_id = ?;`;

const viewerDeleteCommentSql = `
    UPDATE 
        comments
    SET 
        deleted_at = CURRENT_TIMESTAMP, 
        is_archived = TRUE
    WHERE 
        comment_id = ? 
    AND 
        created_by = ?;`;

const deleteComment = async(req, res) => {
    const { comment_id } = req.params;
    const { id, role } = req.user;

    try {
        let result;

        // Check user role and execute the appropriate SQL query
        if (role === 'ADMIN') {
            result = await queryFn(adminDeleteCommentSql, [comment_id]);
        } else if (role === 'VIEWER') {
            result = await queryFn(viewerDeleteCommentSql, [comment_id, id]);
        } else {
            return res.json(errorResponse(403, 'Unauthorized user'));
        }


        if (result.affectedRows === 0) {
            return res.json(errorResponse(404, 'Comment not found or unauthorized'));
        }

        // Successful deletion response
        res.json(successResponse(200, 'Comment deleted successfully'));
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.json(errorResponse(400, 'Error deleting comment'));
    }
};

module.exports = deleteComment;