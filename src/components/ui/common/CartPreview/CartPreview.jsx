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
import cx from 'classnames';
import { debounce, isEmpty, reduce } from 'lodash';
import watchStores from '../../../../utils/decorators/watchStores';
import Button from '../../common/Button';
import CartProducts from '../CartProducts';
import Separator from '../Separator';
import s from './CartPreview.scss';
import { routes } from '../../../../config';
import { getProductsAmountText } from '../../../../utils/cart.js';

const MOUSE_DEBOUNCE_TIME = 150;

@withStyles(s)
@watchStores('cart')
class CartPreview extends Component {
    static contextTypes = {
        executeAction: pt.func.isRequired,
        getStore: pt.func.isRequired
    };

    static propTypes = {
        className: pt.string
    };

    state = {
        showCartPopup: false
    };

    getStoresState() {
        const
            { products } = this.context.getStore('cart').getState(),
            productLength = reduce(products, (memo, { quantity }) => memo + quantity, 0);;

        return { products, productLength };
    }

    handleMouseEnterDebounced = debounce(this.handleMouseEnter, MOUSE_DEBOUNCE_TIME);

    handleMouseEnter(showPopup) {
        !isEmpty(this.state.products) && this.setState({ showCartPopup: showPopup });
    }

    renderPopup(count) {
        return (
            <div className={s.popup}>
                <div className={s.title}>
                    <span>{getProductsAmountText(count)} in cart</span>
                </div>
                <Separator />
                <CartProducts />
                <Separator />
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

    render() {
        const
            { products, productLength } = this.state,
            showCartPopup = !isEmpty(products) && this.state.showCartPopup,
            count = reduce(products, (memo, { quantity }) => memo + quantity, 0);

        return (
            <div
                className={cx(s.root, this.props.className)}
                onMouseEnter={this.handleMouseEnterDebounced.bind(this, true)}
                onMouseLeave={this.handleMouseEnterDebounced.bind(this, false)}
            >
                <div className={s.wrapper}>
                    <span className={this.props.className}>
                    cart[{productLength}]
                    </span>
                </div>
                {showCartPopup && this.renderPopup(count)}
            </div>
        );
    }
}

export default CartPreview;
