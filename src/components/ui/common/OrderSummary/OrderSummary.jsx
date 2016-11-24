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

import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OrderSummary.scss';
import Section from '../Section';
import Separator from '../Separator';
import cx from 'classnames';
import watchStores from '../../../../utils/decorators/watchStores';
import { formatPrice } from '../../../../utils/money';

@withStyles(s)
@watchStores('cart')
class OrderSummary extends Component {
    static contextTypes = {
        getStore: pt.func.isRequired
    };

    getStoresState() {
        const { currency, total } = this.context.getStore('cart').getState();

        return { currency, total };
    }

    render() {
        const { currency, total } = this.state;

        return (
            <Section
                title='total'
                className={s.orderSummary}
                hasBottomMargin={false}
            >
                <div className={s.orderItem}>
                    <span>Products</span>
                    <span>{formatPrice(total, currency)}</span>
                </div>
                <Separator className={s.separator} />
                <div className={cx(s.total, s.orderItem)}>
                    <span>order total</span>
                    <span>{formatPrice(total, currency)}</span>
                </div>
            </Section>
        );
    }
}

export default OrderSummary;
