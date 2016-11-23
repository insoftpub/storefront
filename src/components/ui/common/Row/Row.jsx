import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Row.scss';
import cx from 'classnames';

function Row({
    className,
    spaceBetween = false,
    spaceAround = false,
    children
}) {
    return (
        <div
            className={cx(
                s.root,
                className, {
                    [s.spaceBetween]: spaceBetween,
                    [s.spaceAround]: spaceAround
                }
            )}
        >
            {children}
        </div>
    );
}

export default withStyles(s)(Row);
