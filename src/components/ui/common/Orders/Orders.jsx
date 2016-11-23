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
