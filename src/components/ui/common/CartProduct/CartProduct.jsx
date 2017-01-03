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
            {item.variant && <div className={s.variant}>Color {item.variant.name}</div>}
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
                    variant_id: item.variant && item.variant.id
                }}
            />}
        </div>
    </div>
);

export default withStyles(s)(CartProduct);
