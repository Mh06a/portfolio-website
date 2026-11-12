export class AppError extends Error {
    constructor(message, code = "APP_ERROR") {
        super(message);

        this.name = "AppError";
        this.code = code;
    }
}

/** Thrown by use cases when entity validation fails. `errors` is a { field: message } map. */
export class ValidationError extends AppError {
    constructor(errors) {
        super("Validation failed", "VALIDATION_ERROR");

        this.name = "ValidationError";
        this.errors = errors;
    }
}
