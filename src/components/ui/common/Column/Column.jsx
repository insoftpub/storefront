import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Column.scss';
import cx from 'classnames';

function Column({
    className,
    hasLeftMargin,
    hasRightMargin,
    children,
    flowDirection = 'left',
    alignItems = 'center',
    unshrinkable = false
}) {
    return (
        <div
            className={cx(
                s.root,
                className, {
                    [s.hasLeftMargin]: hasLeftMargin,
                    [s.hasRightMargin]: hasRightMargin,
                    [s.leftDirection]: flowDirection === 'left',
                    [s.bottomDirection]: flowDirection === 'bottom',
                    [s.stretchAlign]: alignItems === 'stretch',
                    [s.centerAlign]: alignItems === 'center',
                    [s.topAlign]: alignItems === 'top',
                    [s.unshrinkable]: unshrinkable
                }
            )}
        >
            {children}
        </div>
    );
}

export default withStyles(s)(Column);
