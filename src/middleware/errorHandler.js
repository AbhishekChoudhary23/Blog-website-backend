const { errorResponse } = require('../utils/customResponse');
const errorClass = require('../utils/errorClassHandler')

// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the stack trace for debugging
    // Set a default error message
    let message = 'An unexpected error occurred';
    // Check if it's a Joi validation error
    if (err.isJoi) {
        message = err.details.map(detail => detail.message).join(', ');
        return res.json(errorResponse(400, { error: message }));
    }
    // Check for specific error types or statuses
    if (err.status) {
        return res.json(errorResponse(err.status, { error: err.message }));
    }


    if (err instanceof errorClass) {
        return res.json(errorResponse(err.status, 'error occured'));
    }


    // Default to internal server error
    res.json(errorResponse(500, { error: message }));
};

module.exports = errorHandler;