import env from "../config/env.js";

const globalErrorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    isOperational: err.isOperational || false,
  };

  // ========== DB errors
  if (err.code === 11000) {
    customError.statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    customError.message = `That ${field} is already in use. Please use another one.`;
    customError.isOperational = true;
  }

  if (err.name === "CastError") {
    customError.statusCode = 400;
    customError.message = `Invalid data format provided for field: ${err.path}`;
    customError.isOperational = true;
  }

  if (err.name === "ValidationError") {
    const errorMessages = Object.values(err.errors).map(val => val.message);
    customError.statusCode = 400; // Bad Request
    customError.message = `Invalid input data: ${errorMessages.join(". ")}`;
    customError.isOperational = true;
  }

  // ========== JWT errors
  if (err.name === "JsonWebTokenError") {
    customError.statusCode = 401;
    customError.message = "Invalid token. Please log in again.";
    customError.isOperational = true;
  }
  if (err.name === "TokenExpiredError") {
    customError.statusCode = 401;
    customError.message = "Your token has expired. Please log in again.";
    customError.isOperational = true;
  }
  if (err.name === "NotBeforeError") {
    customError.statusCode = 401;
    customError.message = "This token is not active yet. Please wait.";
    customError.isOperational = true;
  }

  // =========== sending response

  if (env.NODE_ENV === "development") {
    const logTag = customError.statusCode >= 500 ? "[ERROR]" : "[WARN ]";

    console.error(`${logTag} [EXPRESS] ${customError.message}`);
    console.log(err);

    res.status(customError.statusCode).json({
      success: false,
      message: customError.message,
      stack: err.stack,
    });
  }

  if (env.NODE_ENV === "production") {
    if (customError.isOperational) {
      res.status(customError.statusCode).json({
        success: false,
        message: customError.message,
      });
    }
    console.error(`[FATAL] [PROGRAMMING BUG]:`, err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export {globalErrorHandler};
