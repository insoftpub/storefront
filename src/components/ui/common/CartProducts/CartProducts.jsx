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
