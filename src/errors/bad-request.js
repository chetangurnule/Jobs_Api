import CustomApiError from "./custom-api-error.js";
import statusCode from "http-status-codes";
class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.BAD_REQUEST;
  }
}

export default BadRequestError;
