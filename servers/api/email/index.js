import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { reduce } from 'lodash';

const
    data = {
        resetPassword: {
            path: './email/templates/resetPassword.html',
            subject: 'Reset Password'
        },
        registration: {
            path: './email/templates/registration.html',
            subject: 'Thanks for the registration!'
        },
        order: {
            path: './email/templates/order.html',
            subject: 'Order'
        },
        invoice: {
            path: './email/templates/invoice.html',
            subject: 'Order Invoice'
        },
        receipt: {
            path: './email/templates/receipt.html',
            subject: 'Receipt'
        }
    },
    templates = reduce(data, (result, item, key) => {
        const
            dirname = __dirname.split('email'),
            fileData = readFileSync(path.join(dirname[0], item.path), 'utf-8');

        result[key] = {
            subject: item.subject,
            template: handlebars.compile(fileData)
        };

        return result;
    }, {});

export default templates;


