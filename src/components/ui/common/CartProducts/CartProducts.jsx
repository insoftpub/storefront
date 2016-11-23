import React, { Component, PropTypes as pt } from 'react';
import watchStores from '../../../../utils/decorators/watchStores';
import CartProduct from '../../common/CartProduct';
import s from './CartProducts.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

@withStyles(s)
@watchStores('cart')
class CartProducts extends Component {
    static contextTypes = {
        getStore: pt.func.isRequired,
        executeAction: pt.func.isRequired
    };

    getStoresState() {
        const
            { cartId, products } = this.context.getStore('cart').getState();

        return {
            cartId,
            products
        };
    }

    handleRemoveFromCart = product => {
        const { cartId } = this.state;

        this.context.executeAction('cart/removeProduct', {
            id: cartId,
            productId: product.id
        });
    };

    render() {
        const { products } = this.state;

        return (
            <div>
                {products.map(cartItem => (
                    <CartProduct
                        key={cartItem.id}
                        className={s.product}
                        item={cartItem}
                        showPrice
                        onRemoveClick={this.handleRemoveFromCart.bind(this, cartItem)}
                    />
                ))}
            </div>
        );
    }
}

export default CartProducts;
