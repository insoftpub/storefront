import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TextArea.scss';
import cx from 'classnames';

@withStyles(s)
class TextArea extends Component {
    static propTypes = {
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
        height: pt.number,
        labelPosition: pt.oneOf([
            'left',
            'top',
            'right'
        ])
    };

    static defaultProps = {
        showLabel: false,
        wide: false,
        frame: true,
        textAlign: 'left',
        required: false,
        invalid: false,
        type: 'text',
        height: 100,
        labelPosition: 'top'
    };

    handleChange = (event) => {
        const value = event.target && event.target.value;

        this.props.onChange && this.props.onChange(value);
    };

    render() {
        const { wrapperClassName, labelPosition, showLabel,
            textAlign, height, className, frame, invalid,
            placeholder, title, required, wide } = this.props;

        return (
            <div
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
                        {required && <span>&nbsp;*</span>}
                    </label>
                }
                <div className={s.controls}>
                    <textarea
                        style={{
                            textAlign,
                            minHeight: height + 'px'
                        }}
                        className={cx(s.input, className, {
                            [s.blackFrame]: frame && !invalid,
                            [s.redFrame]: frame && invalid
                        })}
                        placeholder={placeholder || (showLabel ? '' : title)}
                        onChange={this.handleChange}
                        rows='5'
                    />
                    <div className={cx(s.message, {
                        [s.error]: invalid
                    })}
                    >
                        {this.props.error}
                    </div>
                </div>
            </div>
        );
    }
}

export default TextArea;
