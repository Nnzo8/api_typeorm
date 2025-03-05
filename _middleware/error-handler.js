module.exports = errorHandler;

function errorHandler(err,req,res,next){
    switch(true){
        case typeof err === 'string':
        //custom app error
        const is404 = err.toLowerCase().endsWith('Not found');
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({ message: err});
    default:
        return res.status(500).json({ message: err.message});
    }
}