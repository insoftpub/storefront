import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Loader.scss';

function Loader() {
    return (
        <div className={s.root}>
            <div className={s.loader}>
                <svg
                    className={s.circular}
                    viewBox='25 25 50 50'
                >
                    <circle
                        className={s.path}
                        cx='50'
                        cy='50'
                        r='20'
                        fill='none'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                    />
                </svg>
            </div>
        </div>
    );
}

export default withStyles(s)(Loader);
