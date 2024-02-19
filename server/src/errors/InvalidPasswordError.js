class InvalidPasswordError extends Error {
    constructor(message) {
        super(message || 'Invalid password');
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = InvalidPasswordError;
