const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const { postSchema } = require('../middleware/joiValidation');
const validator = require('../utils/validator')

const {
    createPost,
    getAllPosts,
    getMyPost,
    deletePost,
    updatePost,
    searchPosts,
    voteOnPost,
    getPostById
} = require('../controllers/postController');
const isAdmin = require("../middleware/isAdmin");


router.post("/search", searchPosts);
router.post("/createpost", authenticateToken, isAdmin, validator(postSchema), createPost);
router.post("/vote/:post_id", authenticateToken, voteOnPost)
router.get("/allposts", getAllPosts);
router.get("/mypost", authenticateToken, getMyPost);
router.delete('/deletepost/:post_id', isAdmin, authenticateToken, deletePost)
router.patch('/updatepost/:post_id', isAdmin, authenticateToken, updatePost)
router.get('/:post_id', getPostById);

module.exports = router