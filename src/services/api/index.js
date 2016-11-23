import fetch from '../../core/fetch';
import Promise from 'bluebird';
import { createURLEncodedString, isMethodWithBody } from '../../utils/query';
import { api } from '../../config';

export default ({ path = '', method = 'GET', params = {} }) => {
    let url = api.URL + api.VERSION + path;
    const
        urlEncodedString = createURLEncodedString(params, method),
        options = {
            method,
            headers: {}
        };

    if (isMethodWithBody(method)) {
        options['body'] = urlEncodedString;
        options['headers']['Content-Type'] = 'application/x-www-form-urlencoded';
    } else if (method === 'GET') {
        url += urlEncodedString;
    }

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(data => {
                resolve(data.json());
            })
            .catch(error => {
                reject(error);
            });
    });
};
