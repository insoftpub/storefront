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
import watchStores from '../../../../utils/decorators/watchStores';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Orders.scss';
import moment from 'moment';
import { isEmpty, map } from 'lodash';

@withStyles(s)
@watchStores('orders')
class Orders extends Component {
    static contextTypes = {
        getStore: pt.func.isRequired,
        executeAction: pt.func.isRequired
    };

    static propTypes = {
        accountId: pt.string
    };

    componentDidMount() {
        const { accountId } = this.props;

        this.context.executeAction('orders/list', { accountId });
    }

    getStoresState() {
        const { orders, loaded } = this.context.getStore('orders').getState();

        return {
            orders,
            loaded
        };
    }

    render() {
        const { orders, loaded } = this.state;

        if (isEmpty(orders)) {
            if (loaded) {
                return <div>You've got no orders yet.</div>;
            } else {
                return null;
            }
        }

        return (
            <div className={s.root}>
                <table>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th className={s.priceTitle}>Price</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {map(orders, order =>
                            <tr key={order.id}>
                                <td>{order.num}</td>
                                <td className={s.priceValue}>{order.grand_total}</td>
                                <td>{moment(order.date_created).format('YYYY-MM-DD')}</td>
                                <td>{order.status}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Orders;
