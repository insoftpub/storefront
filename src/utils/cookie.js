/**
 * Created by Viktar Markevich on 6/17/2016.
 */

export function getCookieClient(name) {
    const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function getCookieServer(name, req) {
    return req.cookies[name];
}

export function setCookieServer(name, value, res) {
    res.cookies[name] = value;
}

export function setCookieClient(name, value, options) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires === "number" && expires) {
        let d = new Date();

        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + '=' + value;

    for (let propName in options) {
        updatedCookie += '; ' + propName;

        let propValue = options[propName];

        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }

    document.cookie = updatedCookie;
}

export function deleteCookie(name) {
    setCookieClient(name, '', {
        expires: -1
    });
}
