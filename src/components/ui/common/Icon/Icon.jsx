import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Icon.scss';
import cx from 'classnames';
import {
    SIZE_MEDIUM as DEFAULT_SIZE,
    THICKNESS_THIN as DEFAULT_THICKNESS
} from '../../../../constants/icon';
import { COLOR_BLACK as DEFAULT_COLOR } from '../../../../constants/colors';

@withStyles(s)
class Icon extends Component {
    static propTypes = {
        thickness: pt.number,
        color: pt.string,
        size: pt.shape({
            width: pt.number,
            height: pt.number
        }),
        viewBox: pt.shape({
            x: pt.number,
            y: pt.number,
            width: pt.number,
            height: pt.number
        }),
        children: pt.oneOfType([
            pt.array, pt.object
        ]),
        disabled: pt.bool,
        onClick: pt.func,
        href: pt.string
    };

    static defaultProps = {
        thickness: DEFAULT_THICKNESS,
        color: DEFAULT_COLOR,
        size: DEFAULT_SIZE,
        children: [],
        disabled: false,
        href: ''
    };

    handleClick = event => {
        if (!this.props.disabled) {
            this.props.onClick && this.props.onClick(event, this.props.href);
        }
    };

    render() {
        const
            { x, y, width, height } = this.props.viewBox,
            { thickness, className, ...props } = this.props;

        return (
            <svg
                {...props}
                className={cx(className, {
                    [s.clickable]: !!this.props.onClick
                })}
                onClick={this.handleClick}
                viewBox={`${x} ${y} ${width} ${height}`}
                style={{
                    enableBackground: `new ${x} ${y} ${width} ${height}`,
                    width: this.props.size.width,
                    height: this.props.size.height
                }}
            >
                <g stroke={this.props.color} fill={this.props.color} strokeWidth={thickness}>
                    {this.props.children}
                </g>
            </svg>
        );
    }
}

export default Icon;
