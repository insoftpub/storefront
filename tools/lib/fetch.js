import http from 'http';
import Promise from 'bluebird';

export default async(url) => new Promise((resolve, reject) =>
    http.get(url, res => resolve(res)).on('error', err => reject(err))
);
