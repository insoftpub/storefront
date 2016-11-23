import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductLabel.scss';

function ProductLabel({ children }) {
    if (React.Children.toArray(children).length === 0) {
        return null;
    }

    return (
        <div className={s.root}>
            <div className={s.content}>
                <div className={s.inner}>
                    <div className={s.wrapper}>
                        {children}
                    </div>
                </div>
                <div className={s.arrow}>
                    <div className={s.arrowInner}></div>
                </div>
            </div>
        </div>
    );
}

export default withStyles(s)(ProductLabel);
