class BasicHttpError extends Error {
    constructor(httpStatus, body) {
        super('default http error');
        this.httpStatus = httpStatus;
        this.body = body;
        Error.captureStackTrace(this, this.constructor);
    }
}

class AbstractHttpError extends Error {
    constructor(httpStatus, errorMessage, errorCode) {
        super(`Raised HTTP ${httpStatus} error code`);
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}


class BadRequestError extends AbstractHttpError {
    constructor(errorMessage) {
        super(400, errorMessage, 'err.func.badrequest');
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AbstractHttpError {
    constructor(entityType, entityId) {
        const errorMessage = `${entityType} with id ${entityId} not found`;
        super(404, errorMessage, 'err.func.notfound');
        Error.captureStackTrace(this, this.constructor);
    }
}

class ConflictError extends AbstractHttpError {
    constructor(entityId) {
        const errorMessage = `entity ${entityId} has a conflict`;
        super(409, errorMessage, errorMessage, 'err.func.conflict');
        Error.captureStackTrace(this, this.constructor);
    }
}

class LockEntityError extends AbstractHttpError {
    constructor(entityId) {
        const errorMessage = `entity ${entityId} is locked`;
        super(409, errorMessage, 'err.func.locked');
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    BasicHttpError,
    LockEntityError,
    ConflictError,
    AbstractHttpError
};