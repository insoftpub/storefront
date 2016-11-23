import { createURLEncodedString } from '../../../src/utils/query';
import { auth as config } from '../../../src/config';
import fetch from '../../../src/core/fetch';

function authenticate(res) {
    const
        params = {
            app_id: config.facebook.id,
            redirect_uri: 'https://sam.null.by/token/facebook',
            scope: 'public_profile, email'
        },
        stringifiedParams = createURLEncodedString(params, 'GET');

    res.redirect(`https://www.facebook.com/dialog/oauth${stringifiedParams}`);
}

function getToken(req, res) {
    const
        { code } = req.query,
        params = {
            client_id: config.facebook.id,
            client_secret: config.facebook.secret,
            redirect_uri: 'https://sam.null.by/token/facebook',
            code
        },
        options = {
            method: 'GET',
            headers: {}
        },
        paramsEncoded = createURLEncodedString(params, 'GET');

    return fetch(`https://graph.facebook.com/oauth/access_token${paramsEncoded}`, options)
        .then(token => token.text())
        .then(string => string.split('&')[0].split('=')[1])
        .catch(error => {
            res.send({ error });
        });
}

function getProfile(token) {
    const
        params = {
            fields: 'id, name, email'
        },
        paramsEncoded = createURLEncodedString(params, 'GET'),
        options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

    return fetch(`https://graph.facebook.com/v2.5/me${paramsEncoded}`, options)
        .then(profile => profile.json());
}

export default {
    authenticate,
    getToken,
    getProfile
};
