const { errorResponse, successResponse } = require("../../utils/customResponse");
const queryFn = require("../../utils/queryFunction");
const _getPostById = `
    SELECT
        p.post_id AS postId,
        p.title,
        p.content,
        p.topics,
        p.up_downVote AS upDownVotes,
        p.no_of_votes AS noOfVotes,
        u.user_id AS createdByUserId,  -- Use more descriptive alias
        p.created_at AS createdAt
    FROM
        posts p
    JOIN 
        users u ON p.created_by = u.id  -- Join to get user_id
    WHERE
        p.post_id = ?`;

const _fetchCommentsByPostId = `
    SELECT
        c.comment_id AS commentId,
        c.comment_body AS commentBody,
        u.user_id AS createdByUserId,  -- Use more descriptive alias
        c.created_at AS createdAt
    FROM
        comments c
    JOIN 
        users u ON c.created_by = u.id  -- Join to get user_id
    WHERE
        c.post_id = ? 
    AND 
        c.is_archived = 0 
    AND 
        c.deleted_at IS NULL`;

const getPostById = async(req, res, next) => {
    const { post_id } = req.params;
    console.log(post_id);
    try {
        const [rows] = await queryFn(_getPostById, [post_id]);
        console.log(rows);

        // Check if the post exists
        if (!rows) {
            return res.json(errorResponse(400, 'Post not found'));
        }

        const commentRows = await queryFn(_fetchCommentsByPostId, [post_id]);
        console.log(commentRows);

        const response = {
            ...rows,
            comments: commentRows
        };

        // Return the post
        res.json(successResponse(200, "Fetched Post by ID", response));
    } catch (error) {
        console.error("Error retrieving the post:", error);
        res.json(errorResponse(400, 'Error retrieving the post'));
    }
};

module.exports = getPostById;