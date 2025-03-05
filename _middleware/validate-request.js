module.exports = validateRequest;

function validateRequest(req, next, schema){
     // Validation options:
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    // Validate the request body against the schema
    const { error, value } = schema.validate(req, body, options);

    if (error){
          // If validation fails, pass an error message to the next middleware
        next(`Validation Error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        // If valid, replace req.body with the sanitized/validated data
        req.body = value;
        next();
    }
}