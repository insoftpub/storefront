import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Input.scss';
import cx from 'classnames';

@withStyles(s)
class Input extends Component {
    static propTypes = {
        onClick: pt.func,
        onChange: pt.func,
        title: pt.string,
        placeholder: pt.string,
        showLabel: pt.bool,
        className: pt.string,
        wrapperClassName: pt.string,
        wide: pt.bool,
        frame: pt.bool,
        textAlign: pt.oneOf([
            'left',
            'center',
            'right'
        ]),
        required: pt.bool,
        invalid: pt.bool,
        error: pt.string,
        type: pt.string,
        defaultValue: pt.string,
        labelPosition: pt.oneOf([
            'left',
            'top',
            'right'
        ]),
        disabled: pt.bool,
        editable: pt.bool,
        autoFocus: pt.bool,
        nonEditable: pt.bool
    };

    static defaultProps = {
        showLabel: false,
        wide: false,
        frame: true,
        textAlign: 'left',
        required: false,
        invalid: false,
        type: 'text',
        disabled: false,
        editable: true,
        defaultValue: '',
        autoFocus: false,
        nonEditable: false
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue !== this.state.value) {
            this.setState({ value: nextProps.defaultValue });
        }
    }

    handleClick = event => {
        this.props.onClick && this.props.onClick(event);
    };

    handleChange = event => {
        const value = event.target && event.target.value;

        this.setState({ value });
        this.props.onChange && this.props.onChange(value);
    };

    render() {
        const { wrapperClassName, labelPosition, wide, showLabel, title,
            required, textAlign, className, invalid, editable, frame,
            disabled, nonEditable, type, autoFocus, error, placeholder } = this.props;

        return (
            <div
                onClick={this.handleClick}
                className={cx(s.root, wrapperClassName, {
                    [s.wide]: wide,
                    [s.leftLabelPosition]: labelPosition === 'left',
                    [s.rightLabelPosition]: labelPosition === 'right'
                })}
            >
                {
                    showLabel && <label className={cx(s.label, {
                        [s.hasOffset]: labelPosition !== 'top'
                    })}
                    >
                        {title}
                        {required && <span title='Обязательное для заполнения'>&nbsp;*</span>}
                    </label>
                }
                <div className={s.controls}>
                    <input
                        formNoValidate
                        style={{
                            textAlign
                        }}
                        className={cx(s.input, className, {
                            [s.blackFrame]: frame && !invalid,
                            [s.redFrame]: frame && invalid,
                            [s.spanStyle]: !editable
                        })}
                        type={type}
                        placeholder={placeholder || (showLabel ? '' : title)}
                        onChange={this.handleChange}
                        disabled={nonEditable || !editable || disabled}
                        value={this.state.value}
                        autoFocus={autoFocus}
                    />
                    <div className={cx(s.message, {
                        [s.error]: invalid
                    })}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    }
}

export default Input;
