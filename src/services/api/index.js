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
