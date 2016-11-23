import React, { Component, PropTypes as pt } from 'react';
import s from './Collapse.scss';
import withStyles from '../../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

@withStyles(s)
class Collapse extends Component {
    static propTypes = {
        expanded: pt.bool,
        direction: pt.oneOf([
            'height',
            'width'
        ]),
        className: pt.string,
        children: pt.node
    };

    static defaultProps = {
        expanded: true,
        direction: 'height'
    };

    getHeight(ref) {
        if (ref) {
            this.height = ref.scrollHeight;
        } else {
            this.height = 0;
        }
    }

    render() {
        const
            { className, expanded, direction, ...props } = this.props,
            style = expanded ? { [direction]: this.height } : { [direction]: 0 };

        return (
            <div
                {...props}
                ref={this.getHeight.bind(this)}
                className={cx(s.root, className)}
                style={style}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Collapse;
