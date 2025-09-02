const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err) => next(err)) // "send this error to Express’s error handling middleware".
    }
}



    
export {asyncHandler} // Export the asyncHandler function for use in other files
// This utility function can be used to wrap async route handlers in Express.js to handle errors properly