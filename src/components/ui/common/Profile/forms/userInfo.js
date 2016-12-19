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

import React from 'react';
import Button from '../../Button';
import { deliveryRegions } from '../../../../../config';
import { COLOR_WHITE } from '../../../../../constants/colors';

const
    regions = deliveryRegions.map(item => ({
        name: item,
        selectable: true
    }));

export default (component, s) => {
    const { user } = component.state;

    return [{
        name: 'first_name',
        title: 'Name',
        value: user['first_name']
    }, {
        name: 'phone',
        title: 'Phone №',
        value: user['phone']
    }, {
        name: 'email',
        type: 'email',
        title: 'E-mail',
        value: user['email'],
        nonEditable: true
    }, {
        name: 'shipping.address1',
        title: 'Address',
        value: user['shipping']['address1']
    }, {
        name: 'shipping.state',
        type: 'select',
        title: 'Region',
        options: regions,
        defaultValue: 'region1',
        value: user['shipping']['state']
    }, {
        name: 'shipping.city',
        title: 'City',
        value: user['shipping']['city']
    }, {
        name: 'edit',
        type: 'component',
        component: (
            <div className={s.buttons}>
                <Button isSubmit className={s.editButton}>
                    {component.state.isEditMode ? 'Save' : 'Edit'}
                </Button>
                <Button color={COLOR_WHITE} onClick={component.handleCancelClick}>
                    Cancel
                </Button>
            </div>
        )
    }];
};
