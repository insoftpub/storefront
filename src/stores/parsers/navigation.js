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

import { routes } from '../../config';
import { forEach, filter, isNil, chain } from 'lodash';

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
