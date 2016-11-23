import PrettyError from 'pretty-error';
import { statusCodes } from '../../constants';

let errorTemplate = require('../views/error.jade');
const prettyError = new PrettyError();

prettyError.skipNodeFiles();
prettyError.skipPackage('express');

function errorHandler(err, req, res) {
    console.log(prettyError.render(err)); // eslint-disable-line no-console
    const statusCode = err.status || statusCodes.INTERNAL_ERROR;

    res.status(statusCode);
    res.send(errorTemplate({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    }));
}

export default errorHandler;
