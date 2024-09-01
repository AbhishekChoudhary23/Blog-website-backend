const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const errorHandler = require('./middleware/errorHandler.js');
const userRoutes = require('./routers/user.router.js');
const postRouter = require('./routers/post.router.js');
const commentRouter = require('./routers/comment.router.js');
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// -----------------------------    Middleware to parse JSON bodies     -----------------------------

app.use(bodyParser.json());

// -----------------------------    Using User Routers     -----------------------------
app.use('/user', userRoutes);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});