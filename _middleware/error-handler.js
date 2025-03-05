module.exports = errorHandler;

function errorHandler(err,req,res,next){
    switch(true){
        // Check if the error is a string (custom application error)
        case typeof err === 'string':
        // Determine if the error message ends with 'Not found' (case insensitive)
        const is404 = err.toLowerCase().endsWith('Not found');
        const statusCode = is404 ? 404 : 400;// Set the status code: 404 for 'Not found' errors, otherwise 400 (Bad Request)
        return res.status(statusCode).json({ message: err});// Send the error response with appropriate status code
    default:
        return res.status(500).json({ message: err.message});// Handle all other types of errors as internal server errors (500)
    }
}