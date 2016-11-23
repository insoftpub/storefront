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
