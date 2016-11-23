import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CartTable.scss';
import Separator from '../../common/Separator';
import CartProduct from '../../common/CartProduct';
import Price from '../../common/Price';
import Trashcan from '../../common/Icon/Icons/Trashcan.jsx';
import { SIZE_SMALL } from '../../../../constants/icon';
import { isEmpty } from 'lodash';
import CartProductQuantity from '../../common/CartProductQuantity';

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
                <div className={cx(s.cartRow, s.headerRow)}>
                    <div className={s.productColumn}>Product</div>
                    <div className={s.quantityColumn}>Quantity</div>
                    <div className={s.priceColumn}>Price</div>
                    <div className={s.removeColumn}></div>
                </div>
                {products.map((cartItem, idx) =>
                    [
                        <div key={idx} className={s.cartRow}>
                            <CartProduct
                                className={s.productColumn}
                                item={cartItem}
                            />
                            <CartProductQuantity
                                className={s.quantityColumn}
                                quantity={cartItem.quantity}
                                maxQuantity={cartItem.product.stock_level}
                                cartActionParams={{
                                    cart_id: this.props.cartId,
                                    product_id: cartItem.product.id,
                                    variant_id: cartItem.variant.id
                                }}
                            />
                            <Price
                                className={s.priceColumn}
                                amount={cartItem.product.price}
                                discountPercentage={cartItem.product.discount}
                                currency={cartItem.product.currency}
                            />
                            <div className={s.removeColumn}>
                                <Trashcan
                                    size={SIZE_SMALL}
                                    className={s.removeIcon}
                                    onClick={this.handleRemoveFromCart.bind(this, cartItem)}
                                />
                            </div>
                        </div>,
                        <Separator />
                    ]
                )}
            </div>
        );
    }
}

export default CartTable;
