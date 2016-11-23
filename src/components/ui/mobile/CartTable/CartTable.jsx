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
