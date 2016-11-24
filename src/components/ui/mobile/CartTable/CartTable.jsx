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
import s from './CartTable.scss';
import Separator from '../../common/Separator';
import Trashcan from '../../common/Icon/Icons/Trashcan.jsx';
import { SIZE_SMALL } from '../../../../constants/icon';
import { isEmpty, map, first } from 'lodash';
import CartProduct from '../../common/CartProduct';

@withStyles(s)
class CartTable extends Component {
    static contextTypes = {
        getStore: pt.func.isRequired,
        executeAction: pt.func.isRequired
    };

    static propTypes = {
        cartLoaded: pt.bool,
        cartId: pt.string,
        products: pt.array
    };

    handleRemoveFromCart = product => {
        const { cartId } = this.props;

        this.context.executeAction('cart/removeProduct', {
            id: cartId,
            productId: product.id
        });
    };

    renderProduct = ({
        cartItem,
        idx,
        product = cartItem.product,
        image = product && product.images && first(product.images)
    }) =>
        <div key={idx} className={s.product}>
            <CartProduct
                isMobile
                showPrice
                showQuantity
                cartId={this.props.cartId}
                className={s.productColumn}
                item={cartItem}
            />
            <div className={s.removeColumn}>
                <Trashcan
                    size={SIZE_SMALL}
                    className={s.removeIcon}
                    onClick={this.handleRemoveFromCart.bind(this, cartItem)}
                />
            </div>
        </div>;


    render() {
        const { products, cartLoaded } = this.props;

        if (isEmpty(products)) {
            if (cartLoaded) {
                return <div>The cart is empty.</div>;
            } else {
                return null;
            }
        }

        return (
            <div className={s.root}>
                {map(products, (cartItem, idx) =>
                    [
                        this.renderProduct({
                            cartItem,
                            idx
                        }),
                        <Separator />
                    ]
                )}
            </div>
        );
    }
}

export default CartTable;
