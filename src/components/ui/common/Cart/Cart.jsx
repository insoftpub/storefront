import React, { Component, PropTypes as pt } from 'react';
import CartProducts from '../../common/CartProducts';
import Button from '../../common/Button';
import s from './Cart.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import watchStores from '../../../../utils/decorators/watchStores';
import { routes } from '../../../../config';
import { isEmpty } from 'lodash';

@withStyles(s)
@watchStores(
    'cart'
)
class Cart extends Component {
    static contextTypes = {
        getStore: pt.func.isRequired
    };

    getStoresState() {
        const { products } = this.context.getStore('cart').getState();

        return { products };
    }

    render() {
        if (isEmpty(this.state.products)) {
            return <div>The cart is empty.</div>;
        }

        return (
            <div>
                <CartProducts />
                <Button
                    wide
                    className={s.checkoutButton}
                    to={routes.CHECKOUT}
                >
                    Proceed to checkout
                </Button>
            </div>
        );
    }
}

export default Cart;
