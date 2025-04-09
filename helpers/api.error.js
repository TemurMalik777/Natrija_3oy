class ApiError extends Error {
  constructor(status, message, code = null, data = null) {
    super(message);
    this.status = status;
    this.message = message;
    this.code = code;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }
  static forbidden(message) {
    return new ApiError(403, message);
  }
  static unauthorized(message) {
    return new ApiError(401, message);
  }
  static notFound(message) {
    return new ApiError(404, message);
  }
  static internal(message) {
    return new ApiError(500, message);
  }

  // Sequelize errorlarni handle qilish uchun metodlar
  static handleSequelizeError(err) {
    if (err.name === "SequelizeValidationError") {
      const message = err.errors.map((e) => e.message).join(", ");
      return new ApiError(400, `Validation Error: ${message}`);
    }

    if (err.name === "SequelizeUniqueConstraintError") {
      const message = err.errors.map((e) => e.message).join(", ");
      return new ApiError(400, `Unique Constraint Error: ${message}`);
    }

    if (err.name === "SequelizeForeignKeyConstraintError") {
      return new ApiError(400, `Foreign Key Constraint Error: ${err.message}`);
    }

    // Boshqa xatolarni 500 status bilan qaytarish
    return new ApiError(500, "Internal Server Error");
  }

  toJson() {
    return {
      status: this.status,
      message: this.message,
      ...(this.code && { code: this.code }),
      ...(this.data && { data: this.data }),
    };
  }
}

module.exports = ApiError;
