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

import { isEmpty, includes, filter, map } from 'lodash';
import { createFilterQuery } from './filter';

const METHODS_WITH_BODY = [
    'POST',
    'PUT',
    'DELETE'
];

export function isMethodWithBody(method) {
    return includes(METHODS_WITH_BODY, method);
}

export function createURLEncodedString(params, method) {
    const
        results = [],
        firstChar = isMethodWithBody(method) ? '' : '?';

    for (const prop in params) {
        if (typeof params[prop] !== 'object') {
            toString(params[prop], prop, results);
        }
    }

    for (const prop in params) {
        if (typeof params[prop] === 'object') {
            toString(params[prop], prop, results);
        }
    }

    return `${firstChar}${results.join('&')}`;
}

function toString(arg, prevString, results) {
    if (typeof arg !== 'object') {
        results.push(`${prevString}=${encodeURIComponent(arg)}`);
    } else {
        for (const i in arg) {
            toString(arg[i], `${prevString}[${i}]`, results);
        }
    }
}

export function createProductsQueryNew(rootCategory, filterParams) {
    if (!isEmpty(filterParams)) {
        return {
            category_id: rootCategory.id,
            filter: {
                categories_ids: map(filter(filterParams, { type: 'Category' }), item => item.id),
                manufacturers_ids: map(filter(filterParams, { type: 'Manufacturer' }), item => item.id)
            }
        };
    } else {
        return {
            category_id: rootCategory.id
        };
    }
}

export function createProductsQuery(rootCategory, filterParams) {
    if (!isEmpty(filterParams)) {
        return {
            $and: [
                {
                    'category_index.id': rootCategory.id
                },
                ...createFilterQuery(filterParams)
            ]
        };
    } else {
        return {
            'category_index.id': rootCategory.id
        };
    }
}
