import { reduce } from 'lodash';

export function extractText(htmlString) {
    const matches = htmlString.match(/\>[^\<]+\</);

    return reduce(matches, (memo, item) => memo + item.slice(1, item.length - 1), '');
}
