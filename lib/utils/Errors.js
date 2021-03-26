'use strict';

class MoncashError extends Error {
  
  constructor(description,isOperational=false,) {
    super(description);

    this.type = this.constructor.name;
    this.isOperational = isOperational;
  }

  static generate(httpCode) {
    switch (httpCode) {
      case 500:
        return new APIError();
      case 400:
        return new BadRequestError();
      case 401:
        return new UnauthorizedError();
      case 403:
        return new ForbiddenError();
      case 404:
        return new NotFoundError();
      case 409:
        return new ConflictError();
      case 408: 
        return new RequestTimeoutError();
      case 429:
        return new TooManyRequestsError();
      default:
        return new UnexpectedError(httpCode);
    }
  }

  static types = {
    "MoncashError":"MoncashError",
    "APIError":"APIError",
    "BadRequestError":"BadRequestError",
    "UnauthorizedError":"UnauthorizedError",
    "ForbiddenError":"ForbiddenError",
    "NotFoundError":"NotFoundError",
    "ConflictError":"ConflictError",
    "RequestTimeoutError":"RequestTimeoutError",
    "TooManyRequestsError":"TooManyRequestsError",
    "UnexpectedError":"UnexpectedError",
  }

}
 

class APIError extends MoncashError {
  constructor( httpCode = 500, description = 'The server encountered an unexpected condition which prevented it from fulfilling the request.',  isOperational = false) {
    super(description,isOperational);
    this.httpCode = httpCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this);
  }
}

class BadRequestError extends MoncashError {
  constructor( httpCode = 400, description = 'The request could not be understood by the server due to incorrect syntax.',  isOperational = false) {
    super(description,isOperational);
    this.httpCode = httpCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this);
  }
}

class UnauthorizedError extends MoncashError {
  constructor( httpCode = 401,   description = 'The client MAY repeat the request with a suitable Authorization header field', isOperational = false) {
    super(description,isOperational);
    this.httpCode = httpCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this);
  }
}

class ForbiddenError extends MoncashError {
  constructor( httpCode = 403,   description = 'The client does not have access rights to the content.', isOperational = false) {
    super(description,isOperational);
    this.httpCode = httpCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this);
  }
}

class NotFoundError extends MoncashError {
  constructor( httpCode = 404,   description = 'The server can not find the requested resource.', isOperational = false) {
    super(description,isOperational);
    this.httpCode = httpCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this);
  }
}

class ConflictError extends MoncashError {
  constructor( httpCode = 409,   description = 'The request could not be completed due to a conflict with the current state of the resource.', isOperational = true) {
    super(description,isOperational);
    this.httpCode = httpCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this);
  }
}

class RequestTimeoutError extends MoncashError {
  constructor( httpCode = 408,  description = 'The server did not receive a complete request from the client within the server’s allotted timeout period.', isOperational = true) {
    super(description,isOperational);
    this.httpCode = httpCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this);
  }
}

class TooManyRequestsError extends MoncashError {
  constructor( httpCode = 429, description = 'The user has sent too many requests in a given amount of time.', isOperational = true,) {
    super(description,isOperational);
    this.httpCode = httpCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this);
  }
}

class UnexpectedError extends MoncashError {
  constructor( httpCode = null, description = 'The client receive an unexpected error from the server.', isOperational = false) {
    super(description,isOperational);
    this.httpCode = httpCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this);
  }
}


module.exports = {
  MoncashError,
  APIError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  UnexpectedError,
  RequestTimeoutError,
  ForbiddenError,
  BadRequestError,
  ConflictError
};