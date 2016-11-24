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

export const
    headers = {
        accessControl: {
            ALLOW_ORIGIN: '*',
            ALLOW_HEADERS: 'Content-Type, Authorization, Content-Length, X-Requested-With',
            ALLOW_METHODS: 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    },
    aws = {
        FROM: '<your_aws.from>',
        REGION: '<your_aws.region>',
        SELLERS: '<your_aws.sellers>' // string or array of emails
    },
    auth = {
        // https://developers.facebook.com/
        facebook: {
            id: '<your_facebook_app_id>',
            secret: '<your_facebook_app_secret>'
        },

        // https://schema.io
        schemaIO: {
            clientId: '<your_schema_client_id>',
            clientSecret: '<your_schema_client_secret>',
            protocol: 'https://',
            host: 'api.schema.io'
        },

        aws: {
            accessKeyId: '<your_aws_access_key_id>',
            secretAccessKey: '<your_aws_secre_access_key>'
        }
    };
