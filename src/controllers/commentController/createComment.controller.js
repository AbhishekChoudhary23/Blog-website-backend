const { errorResponse, successResponse } = require('../../utils/customResponse');
const queryFn = require('../../utils/queryFunction');

const postSql = `
    SELECT 
        post_id,
        title,
        content,
        topics,
        up_downVote,
        no_of_votes,
        created_by,
        created_at 
    FROM 
        posts 
    WHERE 
        post_id = ?
`;

const commentSql = `
    INSERT INTO comments (
        post_id, 
        created_by, 
        comment_body
        ) 
    VALUES ?`;


const createComment = async(req, res, next) => {
    const { post_id } = req.params;
    const { comment_body } = req.body;
    const { id } = req.user;
    console.log('User ID:', id);
    console.log('Post ID:', post_id);
    console.log('Comment Text:', comment_body);
    // Validate input
    if (!comment_body) {
        return res.json(errorResponse(403, 'Comment text is required'));
    }
    try {

        const [post] = await queryFn(postSql, [post_id]);
        if (post) {
            return res.json(errorResponse(404, 'Post not found'));
        }

        const values = [
            [post_id, id, comment_body]
        ];
        const result = await queryFn(commentSql, [values]);
        if (result.affectedRows === 0) {
            res.json(errorResponse(400, 'Failed to create comment'));
        }

        res.json(successResponse(201, 'Comment created successfully', {
            comment: {
                post_id,
                created_by: id,
                comment_body
            }
        }));

    } catch (error) {
        console.error('Error creating comment:', error);
        return res.json(errorResponse(400, "Something went wrong."));
    }
};
module.exports = createComment;