class DefaultHttpError extends Error {
    constructor(httpStatus, body) {
        super('default http error');
        this.httpStatus = httpStatus;
        this.body = body;
        Error.captureStackTrace(this, this.constructor);
    }
}

class BadRequestError extends Error {
    constructor(errorMessage) {
        super(errorMessage);
        this.errorMessage = errorMessage;
        this.errorCode = 'err.func.badrequest'
        this.httpStatus = 400;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends Error {
    constructor(entityType, entityId) {
        const errorMessage = `${entityType} with id ${entityId} not found`;
        super(errorMessage);
        this.errorMessage = errorMessage;
        this.errorCode = 'err.func.notfound'
        this.httpStatus = 404;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    DefaultHttpError,
};