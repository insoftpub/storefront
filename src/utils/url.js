import { groupBy, map, findIndex } from 'lodash';

export function createFilterUrl(selected) {
    const
        grouped = groupBy(selected, 'type'),
        newItems = map(grouped, section => {
            return map(section, item => item.slug)
                .join(':');
        }),
        currentPathname = window.location.pathname,
        pathnameItems = currentPathname.split('/'),
        productsIndex = findIndex(pathnameItems, a => a === 'products'),
        newPathnameItems = [
            ...pathnameItems.slice(0, productsIndex + 2),
            ...newItems
        ];

    return newPathnameItems.join('/');
}
