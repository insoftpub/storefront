import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ComponentField.scss';
import cx from 'classnames';

function ComponentField({ component, className }) {
    return (
        <div className={cx(s.root, className)}>
            {component}
        </div>
    );
}

export default withStyles(s)(ComponentField);
