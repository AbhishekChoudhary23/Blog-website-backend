const queryFn = require("../../utils/queryFunction");
const { errorResponse, successResponse } = require("../../utils/customResponse");

// Upsert query for user votes
const _upsertVote = `
    INSERT INTO user_votes (
        user_id,   
        post_id, 
        vote_value
    )
    VALUES 
        (?)
    ON DUPLICATE KEY UPDATE 
        vote_value = VALUES(vote_value);`;

const _checkVoteExists = `
    SELECT 
        vote_value 
    FROM 
        user_votes
    WHERE  
        user_id = ? 
    AND 
        post_id = ?`;

const _deleteVote = `
    DELETE FROM 
        user_votes
    WHERE 
        user_id = ?
    AND 
        post_id = ?`;

const _updatePostVotes = `
    UPDATE 
        posts
    SET 
        up_downVote = (
            SELECT COALESCE(SUM(vote_value), 0) FROM user_votes WHERE post_id = ?
        ), 
        no_of_votes = (
            SELECT COUNT(*) FROM user_votes WHERE post_id = ?
        )
    WHERE 
        post_id = ?`;

const voteOnPost = async(req, res) => {
    const { id } = req.user; // User ID from the request
    const { post_id } = req.params; // Post ID from the URL parameters
    const { voteValue } = req.body; // Vote value from the request body

    try {
        const [existingVote] = await queryFn(_checkVoteExists, [id, post_id]);

        // If voteValue is null, remove the vote
        if (voteValue === null) {
            if (existingVote) {
                // Remove the vote
                await queryFn(_deleteVote, [id, post_id]);
                // Update post with the new vote totals
                await queryFn(_updatePostVotes, [post_id, post_id, post_id]);
                return res.json(successResponse(200, "Vote removed successfully"));
            } else {
                return res.json(successResponse(200, "No vote to remove"));
            }
        }

        // Check if the user has already voted with the same value
        if (existingVote && existingVote.vote_value === voteValue) {
            return res.json(errorResponse(400, "User has already voted with the same value"));
        }

        // Prepare values for the upsert query
        const values = [
            [id, post_id, voteValue]
        ];

        // Use upsert query to insert or update the vote
        await queryFn(_upsertVote, values);

        // Update post with the new vote totals
        await queryFn(_updatePostVotes, [post_id, post_id, post_id]);

        return res.json(successResponse(201, "Vote successfully recorded"));
    } catch (error) {
        console.error("Error processing vote:", error);
        res.json(errorResponse(400, "Error processing vote"));
    }
};

module.exports = voteOnPost;