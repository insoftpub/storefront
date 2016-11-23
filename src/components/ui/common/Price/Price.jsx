import React from 'react';
import s from './Price.scss';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { formatPrice, calculatePrice } from '../../../../utils/money';

const Price = ({
    amount = 0,
    discountPercentage = 0,
    hasDiscount = discountPercentage > 0,
    currency = 'USD',
    className
}) => (
    <div className={cx(className, s.root)}>
        <span className={cx(s.price, { [s.oldPrice]: hasDiscount })}>
            {formatPrice(amount, currency)}
        </span>
        {hasDiscount && <span className={cx(s.price, s.newPrice)}>
            {formatPrice(calculatePrice(amount, discountPercentage), currency)}
        </span>}
    </div>
);

export default withStyles(s)(Price);
