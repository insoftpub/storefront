import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Separator.scss';
import cx from 'classnames';
import { COLOR_LIGHT_GRAY } from '../../../../constants/colors';

function Separator({ className, color = COLOR_LIGHT_GRAY, height = '1px' }) {
    return (
        <span
            className={cx(s.root, className)}
            style={{
                backgroundColor: color,
                height
            }}
        />
    );
}

export default withStyles(s)(Separator);
