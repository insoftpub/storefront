import { filter } from 'lodash';

export function parseCategories({ results }) {
    return {
        categories: filter(results, { type: 'Category' }),
        manufacturers: filter(results, { type: 'Manufacturer' })
    };
}
