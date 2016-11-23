import fetch, { Request, Headers, Response } from 'node-fetch';

function localUrl(url) {
    if (url.startsWith('//')) {
        return `https:${url}`;
    }

    if (url.startsWith('http')) {
        return url;
    }

    return `http://${url}`;
}

function localFetch(url, options) {
    return fetch(localUrl(url), options);
}

export { localFetch as default, Request, Headers, Response };
