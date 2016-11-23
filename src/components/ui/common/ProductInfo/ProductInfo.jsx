import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductInfo.scss';
import Price from '../../common/Price';
import cx from 'classnames';

const ProductInfo = ({ product, className }) => 
    <section className={className}>
        <div className={cx(s.smartAlign, s.name)}>
            {product.name}
        </div>
        <div className={cx(s.smartAlign, s.sku)}>
            SKU {product.sku}
        </div>
        <Price
            className={cx(s.smartAlign, s.price)}
            amount={product.price}
            currency={product.currency}
        />
    </section>;

export default withStyles(s)(ProductInfo);
