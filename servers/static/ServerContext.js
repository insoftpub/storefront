import Context from '../../src/Context';
import { getCookieServer, setCookieServer } from '../../src/utils/cookie';
import { addStyle } from '../../src/utils/styles';
import { createPaginationLink } from '../../src/utils/pagination';
import statusCodes from '../../src/constants/statusCodes';
import assets from './assets';
import { siteName } from './config';

class ServerContext extends Context {
    constructor({ req, res }) {
        super();

        this.req = req;
        this.res = res;

        this.initialize();
        this.bind();
    }

    initialize() {
        this.css = [];
        this.status = statusCodes.OK;
        this.data = {
            title: '',
            description: '',
            css: '',
            body: '',
            entry: assets.main.js
        };
    }

    bind() {
        this.getCookie = this.getCookie.bind(this);
        this.setCookie = this.setCookie.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.getUserAgent = this.getUserAgent.bind(this);
        this.insertPaginationInfo = this.insertPaginationInfo.bind(this);
        this.insertCss = this.insertCss.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.onSetMeta = this.onSetMeta.bind(this);
        this.onPageNotFound = this.onPageNotFound.bind(this);
    }

    getStatus() {
        return this.status;
    }

    getData() {
        return this.data;
    }

    getCss() {
        return this.css;
    }

    getUserAgent() {
        return this.req.useragent;
    }

    getCookie(name) {
        return getCookieServer(name, this.req);
    }

    setCookie(name, value) {
        return setCookieServer(name, value, this.res);
    }

    insertPaginationInfo(page, lastPage) {
        return createPaginationLink(page, lastPage, this.req.url, this.css);
    }

    insertCss(styles) {
        return addStyle(styles, this.css);
    }

    setTitle(value) {
        this.data.title = `${value} - ${siteName}`;
    }

    onSetMeta(name, value, key = 'name') {
        if (!this.data.meta) {
            this.data.meta = '';
        }

        this.data.meta += `<meta ${key}="${name}" content="${value}">`;
    }

    onPageNotFound() {
        this.status = statusCodes.PAGE_NOT_FOUND;
    }
}

export default ServerContext;
