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
