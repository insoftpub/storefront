import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContentFrame.scss';
import cx from 'classnames';

@withStyles(s)
class ContentFrame extends Component {
    static propTypes = {
        className: pt.string,
        children: pt.node,
        size: pt.oneOf([
            'small',
            'medium',
            'large'
        ])
    };

    static defaultProps = {
        size: 'medium'
    };

    render() {
        return (
            <div className={cx(s.root, this.props.className, s[this.props.size])}>
                {this.props.children}
            </div>
        );
    }
}

export default ContentFrame;
