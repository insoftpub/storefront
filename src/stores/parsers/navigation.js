import { routes } from '../../config';
import { forEach, filter, isNil, chain, values } from 'lodash';

const BACK_POINT_PATHS = [
    routes.PRODUCTS,
    routes.CATEGORY
];

function isBackPointPath(path) {
    let isBackPoint = false;

    forEach(BACK_POINT_PATHS, subpath => {
        if (path.includes(subpath)) {
            isBackPoint = true;
        }
    });

    return isBackPoint;
}

function getNavigationItemUrl(navigationItem) {
    if (navigationItem.type === 'Manufacturer') {
        return `${routes.PRODUCTS}/${navigationItem.slug}`;
    }

    return `${routes.PRODUCTS}/${navigationItem.slug}`;
}

function parseNavigation(data) {
    const
        { results } = data,
        navigation = chain(results)
            .filter(item => item.navigation === true)
            .map(link => ({
                name: link.name,
                to: getNavigationItemUrl(link),
                links: link.links,
                id: link.id,
                parent_id: link.parent_id
            }))
            .map((link, idx, linksArr) => ({
                ...link,
                links: filter(linksArr, childLink => childLink.parent_id === link.id)
            }))
            .filter(link => isNil(link.parent_id))
            .value();

    return navigation;
}

export {
    isBackPointPath,
    parseNavigation
};
