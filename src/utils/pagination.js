import { findIndex } from 'lodash';

const prefix = 'page-';

export function createPaginationLink(page, lastPage, path, container) {
    if (page - 1 > 0) {
        const
            index = path.indexOf('page='),
            newPath = getNewPath(path, index, page - 1),
            id = prefix + (page - 1),
            element = `<link id='${id}' rel='prev' href=${newPath}>`,
            item = {
                id,
                element
            };

        findIndex(container, { id: item.id }) === -1 && container.push(item);
    }
    if (page + 1 <= lastPage) {
        const
            index = path.indexOf('page='),
            newPath = getNewPath(path, index, page + 1),
            id = prefix + (page + 1),
            element = `<link id='${id}' rel='next' href=${newPath}>`,
            item = {
                id,
                element
            };

        findIndex(container, { id: item.id }) === -1 && container.push(item);
    }
}


function getNewPath(path, index, page) {
    if (index !== -1) {
        return `${path.substr(0, index + 5)}${page}${path.substr(index + 7)}`;
    } else {
        return path.indexOf('?') === -1 ? `${path}?page=${page}` : `${path}&page=${page}`;
    }
}
