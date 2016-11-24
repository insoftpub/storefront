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

import { deliveryRegions } from '../../../../../config';
import { isEmpty } from 'lodash';

const
    regions = deliveryRegions.map(item => ({
        name: item,
        key: item,
        selectable: true
    }));

export default component => {
    const { user, orderErrors: errors, isLogged } = component.state;

    return [{
        name: 'error_message',
        type: 'error',
        errors,
        noMargin: isEmpty(errors)
    }, {
        name: 'first_name',
        title: 'Name',
        validators: {
            required: true
        },
        value: user['first_name']
    }, {
        name: 'phone',
        title: 'Phone',
        validators: {
            required: true
        },
        value: user['phone']
    }, {
        name: 'email',
        type: 'email',
        title: 'E-mail',
        disabled: isLogged,
        validators: {
            required: true
        },
        value: user['email']
    }, {
        name: 'password',
        type: 'password',
        title: 'Password',
        hidden: isLogged,
        validators: {
            required: true
        }
    }, {
        name: 'address1',
        title: 'Address',
        validators: {
            required: true
        },
        value: user['shipping']['address1']
    }, {
        name: 'state',
        type: 'select',
        title: 'Region',
        options: regions,
        defaultValue: 'region1',
        value: user['shipping']['state']
    }, {
        name: 'city',
        title: 'City',
        value: user['shipping']['city']
    }, {
        name: 'comments',
        title: 'Comments',
        type: 'textarea'
    }];
};
