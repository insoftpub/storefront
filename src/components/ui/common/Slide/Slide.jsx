import React, { Component, PropTypes as pt } from 'react';
import s from './Slide.scss';
import withStyles from '../../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

@withStyles(s)
class Slide extends Component {
    static propTypes = {
        className: pt.string,
        visible: pt.bool,
        direction: pt.oneOf([
            'top',
            'bottom',
            'left',
            'right'
        ]),
        start: pt.oneOfType([
            pt.string,
            pt.number
        ]),
        end: pt.oneOfType([
            pt.string,
            pt.number
        ]),
        children: pt.node
    };

    render() {
        const { className, visible, direction, start, end, ...props } = this.props;

        return (
            <div
                {...props}
                className={cx(s.root, className)}
                style={{
                    [direction]: visible ? end : start
                }}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Slide;
