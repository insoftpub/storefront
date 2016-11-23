import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Title.scss';
import cx from 'classnames';

function Title({ text, subtext, className }) {
    return (
        <header className={cx(s.root, className)}>
            {text && <h1 className={cx(s.h, s.text)}>{text}</h1>}
            {subtext && <h2 className={cx(s.h, s.subtext, { [s.subtextNoMargin]: !text })}>{subtext}</h2>}
        </header>
    );
}

export default withStyles(s)(Title);
