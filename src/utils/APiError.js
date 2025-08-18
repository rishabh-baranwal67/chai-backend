class ApiError extends error{ // Custom error class for handling API errors
    // This class extends the built-in Error class to create a custom error type for API errors
    // It includes properties for status code, message, data, and stack trace.
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        statck = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(statck){
            this.stack = statck
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


export { ApiError } // Export the ApiError class for use in other files