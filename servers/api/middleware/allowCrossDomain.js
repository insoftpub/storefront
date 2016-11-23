import { headers } from '../config';

function allowCrossDomain(req, res, next) {
    res.set('Access-Control-Allow-Origin', headers.accessControl.ALLOW_ORIGIN);
    res.set('Access-Control-Allow-Headers', headers.accessControl.ALLOW_HEADERS);
    next();
}

export default allowCrossDomain;
