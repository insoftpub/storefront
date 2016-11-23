import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Progress.scss';

function Progress() {
    return (
        <div className={s.root}>
            <div className={s.indeterminate}></div>
        </div>
    );
}

export default withStyles(s)(Progress);
