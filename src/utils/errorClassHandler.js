class CustomError extends Error {
    constructor(errors, errStatus) {
        // Join the error messages into a single string
        const message = errors.map(detail => detail.message).join(', ');
        // const message = errors.message;
        super(message); // Call the parent constructor with the joined message
        this.name = this.constructor.name; // Set the error name to the class name
        this.status = errStatus;
        this.errors = errors; // Store the original errors for further use
    }
}

module.exports = CustomError;