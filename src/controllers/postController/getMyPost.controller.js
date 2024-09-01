const { successResponse, errorResponse } = require("../../utils/customResponse");
const queryFn = require("../../utils/queryFunction");

const _getMyPost =
    `SELECT 
    p.post_id AS postId,
    p.title,
    p.content,
    p.topics,
    p.up_downVote AS upDownVote,
    p.no_of_votes AS noOfVotes,
    u.user_id AS createdBy,
    p.created_at AS createdAt
FROM 
    posts p
JOIN 
    users u ON p.created_by = u.id  
WHERE
    p.created_by = ?
AND 
    p.is_archived = 0
    `;


const getMyPost = async(req, res) => {
    const { id } = req.user;

    try {
        const results = await queryFn(_getMyPost, [id]);
        console.log('Here are your posts');
        res.json(successResponse(200, "Fetched all Posts", results));
    } catch (err) {
        console.error("Error fetching posts:", err);
        return res.json(errorResponse(400, "Something went wrong."));
    }
};

module.exports = getMyPost