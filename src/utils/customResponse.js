const successResponse = (statusCode, message, data = null) => {
    return {
        statusCode,
        message,
        data,
    };
};
const errorResponse = (statusCode, message) => {
    return {
        statusCode,
        message,
        timeStamp: new Date().toISOString(),
    };
};
module.exports = { successResponse, errorResponse };