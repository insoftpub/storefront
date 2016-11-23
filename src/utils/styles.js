import { findIndex, reduce } from 'lodash';

const prefix = 'css-';

export function addStyle(styles, css) {
    const style = processStyles(styles);

    findIndex(css, { id: style.id }) === -1 && css.push(style);
}

export function processStyles(styles) {
    const
        id = createId(styles),
        element = `<style type='text/css' id=${id}>${styles._getCss()}</style>`;

    return {
        id,
        element
    };
}

export function createId(styles) {
    const uniq = reduce(styles, (res, item, key) => {
        if (typeof item !== 'function') {
            res += item;
        }

        return res;
    }, '');

    return prefix + uniq;
}

export function removeCss(element) {
    element.parentNode.removeChild(element);
}
