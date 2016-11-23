import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Button.scss';
import cx from 'classnames';
import { COLOR_BLACK, COLOR_WHITE, COLOR_BLUE } from '../../../../constants/colors';

@withStyles(s)
class Button extends Component {
    static contextTypes = {
        executeAction: pt.func.isRequired
    };

    static propTypes = {
        onClick: pt.func,
        wide: pt.bool,
        to: pt.string,
        frame: pt.bool,
        color: pt.oneOf([
            COLOR_WHITE,
            COLOR_BLACK,
            COLOR_BLUE
        ]),
        icon: pt.element,
        disabled: pt.bool,
        form: pt.string,
        className: pt.string,
        isSubmit: pt.bool,
        children: pt.node
    };

    static defaultProps = {
        wide: false,
        frame: true,
        color: COLOR_BLACK,
        disabled: false,
        isSubmit: false
    };

    handleClick = event => {
        if (this.props.to) {
            event.preventDefault();

            this.context.executeAction('navigate/to', {
                url: this.props.to
            });
        }

        this.props.onClick && this.props.onClick(event);
    };

    renderIcon() {
        return (
            <span className={s.icon}>
                {this.props.icon}
            </span>
        );
    }

    render() {
        return (
            <button
                type={this.props.isSubmit ? 'submit' : 'button'}
                form={this.props.form}
                onClick={this.handleClick}
                className={cx(this.props.className, s.root, {
                    [s.black]: this.props.color === COLOR_BLACK,
                    [s.white]: this.props.color === COLOR_WHITE,
                    [s.blue]: this.props.color === COLOR_BLUE,
                    [s.frame]: this.props.frame,
                    [s.wide]: this.props.wide,
                    [s.disabled]: this.props.disabled
                })}
                disabled={this.props.disabled}
            >
                <span className={s.text}>
                    {this.props.children}
                </span>
                {this.props.icon && this.renderIcon()}
            </button>
        );
    }
}

export default Button;
