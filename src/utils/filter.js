import { reduce, map, filter, isEmpty, head } from 'lodash';

export function createFilterQuery(params) {
    return reduce([
        filter(params, { type: 'Category' }),
        filter(params, { type: 'Manufacturer' })
    ], (memo, collection) => {
        if (!isEmpty(collection)) {
            memo.push(createOrQuery(collection));
        }

        return memo;
    }, []);
}

function createOrQuery(collection) {
    if (collection.length === 1) {
        return {
            'category_index.id': head(collection).id
        };
    }

    return {
        $or: map(collection, param => ({
            'category_index.id': param.id
        }))
    };
}
