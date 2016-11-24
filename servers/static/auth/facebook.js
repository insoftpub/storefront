/**
 * MIT License
 *
 * Copyright (c) 2016 InSoft Engineering / github.com/insoftpub
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { createURLEncodedString } from '../../../src/utils/query';
import { auth as config } from '../../api/config';
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
