/**
 * MIT License
 *
 * Copyright (c) 2016 InSoft Engineering / github.com/insoftpub
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import templates from '../email';
import { statusCodes } from '../../constants';
import pdf from 'html-pdf';
import sendEmail from './email.js';
import moment from 'moment';
import Logger from '../Logger';
import { aws } from '../config';

const
    options = {
        format: 'Letter'
    },
    logger = new Logger();

function invoice(req, res) {
    const
        { data } = req.body,
        receiptTemplate = templates['receipt'].template,
        invoiceTemplate = templates['invoice'].template,
        modifiedData = {
            ...data,
            date_created: moment(data.date_created).format('YYYY-MM-DD')
        },
        invoiceHtml = invoiceTemplate(modifiedData),
        receiptHtml = receiptTemplate(modifiedData);

    logger.add({
        req,
        params: req.body,
        statusCode: statusCodes.OK,
        time: 0
    });

    pdf
        .create(invoiceHtml, options)
        .toBuffer((errInvoice, datInvoice) => {
            if (!errInvoice) {
                pdf
                    .create(receiptHtml, options)
                    .toBuffer((errReceipt, datReceipt) => {
                        if (!errReceipt) {
                            req.body.attachments = [
                                { content: datInvoice.toString('base64'), name: 'invoice.pdf' },
                                { content: datReceipt.toString('base64'), name: 'receipt.pdf' }
                            ];
                            req.body.data = modifiedData;
                            req.body.email = aws.SELLERS;

                            sendEmail(req, res);
                        } else {
                            console.log('Cannot create receipt pdf');
                            console.log(errReceipt);
                        }
                    });
            } else {
                console.log('Cannot create invoice pdf');
                console.log(errInvoice);
            }
        });
}

export default invoice;
