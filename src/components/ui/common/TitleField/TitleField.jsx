import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TitleField.scss';
import cx from 'classnames';

function TitleField({ text, className }) {
    return (
        <header className={cx(s.root, className)}>
            {text}
        </header>
    );
}

export default withStyles(s)(TitleField);
