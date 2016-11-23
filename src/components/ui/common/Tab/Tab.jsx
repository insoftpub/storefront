import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tab.scss';

function Tab({ children }) {
    return (
        <div className={s.root}>
            {children}
        </div>
    );
}

export default withStyles(s)(Tab);
