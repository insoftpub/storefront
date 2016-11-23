import strategies from '../auth/strategies';
import { last } from 'lodash';

function auth(req, res) {
    const
        domain = last(req.path.split('/')),
        { authenticate } = strategies[domain];

    authenticate(res);
}

export default auth;
