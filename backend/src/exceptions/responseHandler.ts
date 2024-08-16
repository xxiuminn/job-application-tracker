// in the built-in Error class, there's name, message and stack. Default name is "Error".

enum Status {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export class BaseError extends Error {
  status: Status;

  constructor(message: string, status: Status) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, Status.NOT_FOUND);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super(message, Status.INTERNAL_ERROR);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, Status.BAD_REQUEST);
  }
}

export class UnauthourizedError extends BaseError {
  constructor(message: string) {
    super(message, Status.UNAUTHORIZED);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message, Status.FORBIDDEN);
  }
}
