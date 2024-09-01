const { errorResponse, successResponse } = require("../../utils/customResponse");
const queryFn = require("../../utils/queryFunction");

const _searchPosts = `
SELECT 
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
    p.is_archived = 0 AND
    (p.title LIKE ? OR 
    p.topics LIKE ?
    )`;

const searchPosts = async(req, res, next) => {
    const { searchTerm } = req.body; // Expects a search term in the request body

    if (!searchTerm) {
        return res.json(errorResponse(400, "Search term is required."));
    }


    if (searchTerm.length < process.env.MIN_SEARCH_TERM_LENGTH) {
        return res.json(errorResponse(400, `Search term must be at least ${process.env.MIN_SEARCH_TERM_LENGTH} characters long.`));
    }

    // Prepare the search term for SQL LIKE (case-insensitive)
    const searchPattern = `%${searchTerm}%`; // Wrap the search term with wildcards

    try {
        const results = await queryFn(_searchPosts, [searchPattern, searchPattern]);

        if (results.length === 0) {
            return res.json(errorResponse(404, "No posts found matching the search criteria."));
        }

        res.json(successResponse(200, "Posts retrieved successfully.", results));
    } catch (err) {
        console.error("Error searching posts:", err);
        return res.json(errorResponse(400, "Something went wrong."));
    }
};

module.exports = searchPosts;