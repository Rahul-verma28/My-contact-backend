const {constants} = require('../constants');

const errorHandler =(err, req, res, next) =>{
    const statusCode = res.statusCode? res.statusCode: 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({tittle: "VALIDATION FAILED", message: err.message});
            break;
        case constants.UNAUTHORISED:
            res.json({tittle: "UNAUTHORISED", message: err.message});
            break;
        case constants.FORBIDDEN:
            res.json({tittle: "FORBIDDEN", message: err.message});
            break;
        case constants.NOT_FOUND :
            res.json({tittle: "NOT FOUND ", message: err.message});
            break;
        case constants.SERVER_ERROR :
            res.json({tittle: "SERVER ERROR ", message: err.message});
            break;
        default:
            console.log("No error, all good with status code-", statusCode);
            break;
    }
}

module.exports = errorHandler;