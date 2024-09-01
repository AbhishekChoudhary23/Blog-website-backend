const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const { commentSchema } = require('../middleware/joiValidation');
const validator = require('../utils/validator');
const createComment = require("../controllers/commentController/createComment.controller");
const deleteComment = require("../controllers/commentController/deleteComment");

router.post('/create/:post_id', validator(commentSchema), authenticateToken, createComment);
router.delete('/delete/:comment_id', authenticateToken, deleteComment)

module.exports = router;