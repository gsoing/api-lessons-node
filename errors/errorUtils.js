const concatErrors = (errors, error) => {
    if(errors) {
        if(Array.isArray(errors)) {
            errors.push(error);
        }
    } else {
        errors = [];
        errors.push(error);
    }
    return errors;
};

const transformErrors = (errors) => {
    return errors.map( (error) => {
        return { errorCode: 'err.func.badrequest', errorMessage: `${error.msg} for ${error.param}  ${error.location}`} 
    });
};

exports.transformErrors = transformErrors;
exports.concatErrors = concatErrors;
