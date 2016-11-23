import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { first } from 'lodash';
import Image from '../Image';
import Price from '../Price';
import Link from '../Link';
import CartProductQuantity from '../CartProductQuantity';
import { routes } from '../../../../config';
import s from './CartProduct.scss';

const CartProduct = ({
    className,
    item = {},
    cartId,
    isMobile = false,
    showPrice = false,
    showQuantity = false,
    product = item.product,
    image = product && product.images && first(product.images)
}) => (
    <div className={cx(s.root, className, s.content)}>
        <Link
            custom
            to={routes.PRODUCT + '/' + product.slug}
            className={s.image}
        >
            <Image src={image && image.url} />
        </Link>
        <div className={cx(s.text, { [s.centerText]: isMobile })}>
            <div className={s.name}>
                {product.name}
            </div>
            <div className={s.variant}>Color {item.variant.name}</div>
            {showPrice && <Price
                className={s.price}
                amount={product.price}
                discountPercentage={product.discount}
                currency={product.currency}
            />}
            {showQuantity && <CartProductQuantity
                className={s.quantity}
                quantity={item.quantity}
                maxQuantity={item.product.stock_level}
                cartActionParams={{
                    cart_id: cartId,
                    product_id: item.product.id,
                    variant_id: item.variant.id
                }}
            />}
        </div>
    </div>
);

export default withStyles(s)(CartProduct);
