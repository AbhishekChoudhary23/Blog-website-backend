const createPost = require("./createPost.controller.js");
const getAllPosts = require("./getAllPost.controller.js");
const getMyPost = require("./getMyPost.controller.js");
const deletePost = require("./deletePost.controller.js");
const updatePost = require("./updatePost.controller.js");
const searchPosts = require("./search.controller.js");
const voteOnPost = require("./upDownVote.controller.js");
const getPostById = require("./getPostById.controller");


module.exports = {
    createPost,
    getAllPosts,
    getMyPost,
    deletePost,
    updatePost,
    searchPosts,
    getPostById,
    voteOnPost
}