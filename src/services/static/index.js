import fetch from '../../core/fetch';
import { baseUrl } from '../../config';

export default (path = '/') => {
    return fetch(baseUrl + path);
};
