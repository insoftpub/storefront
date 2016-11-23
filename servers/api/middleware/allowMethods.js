import { statusCodes } from '../../constants';
import { headers } from '../config';

function allowMethods(req, res, next) {
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', headers.accessControl.ALLOW_METHODS);

        res.sendStatus(statusCodes.OK);
    } else {
        next();
    }
};

export default allowMethods;
