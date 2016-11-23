import React from 'react';
import s from './ProductDescription.scss';
import cx from 'classnames';
import withStyles from '../../../../../node_modules/isomorphic-style-loader/lib/withStyles';

const ProductDescription = ({ text }) =>
    <div className={cx(s.smartAlign, s.root)}>
        {text}
    </div>;

export default withStyles(s)(ProductDescription);
