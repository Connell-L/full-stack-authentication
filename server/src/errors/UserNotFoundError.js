class UserNotFoundError extends Error {
    constructor(message) {
        super(message || 'User not found');
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UserNotFoundError;
