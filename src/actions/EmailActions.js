import service from '../services/api';
import { baseUrl, siteName } from '../config';

export default {
    send(context, { data, ...params }) {
        return service({
            path: `/email`,
            method: 'POST',
            params: {
                ...params,
                data: {
                    ...data,
                    shopUrl: baseUrl,
                    shopName: siteName
                }
            }
        });
    },

    sendInvoice(context, { data, ...params }) {
        return service({
            path: '/invoice',
            method: 'POST',
            params: {
                ...params,
                data: {
                    ...data,
                    shopUrl: baseUrl,
                    shopName: siteName
                }
            }
        });
    }
};
