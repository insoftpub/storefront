import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Select.scss';
import cx from 'classnames';
import onClickOutside from 'react-onclickoutside';
import IconAngleDown from '../Icon/Icons/Controls/AngleDown.jsx';
import IconAngleUp from '../Icon/Icons/Controls/AngleUp.jsx';
import IconApproved from '../Icon/Icons/Approved.jsx';
import { SIZE_EXTRA_SMALL as ICON_SIZE } from '../../../../constants/icon';
import { findIndex } from 'lodash';

const
    ICON_THICKNESS = 5,
    EMPTY_INDEX = -1;

@withStyles(s)
@onClickOutside
class Select extends Component {
    static propTypes = {
        withIcon: pt.bool,
        onChange: pt.func,
        title: pt.string,
        placeholder: pt.string,
        showLabel: pt.bool,
        className: pt.string,
        wrapperClassName: pt.string,
        wide: pt.bool,
        frame: pt.bool,
        required: pt.bool,
        options: pt.array, // [{name1, selectable1}, {name2, selectable2}, ...]
        labelPosition: pt.oneOf([
            'left',
            'top',
            'right'
        ]),
        defaultValue: pt.string,
        editable: pt.bool,
        invalid: pt.bool,
        error: pt.string
    };

    static defaultProps = {
        showLabel: false,
        wide: false,
        frame: true,
        required: false,
        options: [],
        labelPosition: 'top',
        defaultValue: '',
        editable: true,
        invalid: false,
        error: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            index: findIndex(props.options, { name: props.defaultValue })
        };
    }

    componentWillReceiveProps(nextProps) {
        const
            { index } = this.state,
            { options } = this.props,
            { defaultValue } = nextProps;

        if ((index === EMPTY_INDEX) || ((index > EMPTY_INDEX) && (defaultValue !== options[index].name))) {
            const newIndex = findIndex(options, { name: defaultValue });

            (newIndex !== index) && this.setState({ index: newIndex });
        }
    }

    handleToggle = () => {
        if (this.props.editable) {
            this.setState({
                collapsed: !this.state.collapsed
            });
        }
    };

    handleChoose(index) {
        this.setState({
            collapsed: true,
            index: +index
        });

        if (this.props.options[index]) {
            this.props.onChange && this.props.onChange(this.props.options[index].key || this.props.options[index].name);
        } else {
            this.props.onChange && this.props.onChange(EMPTY_INDEX);
        }
    }

    handleClickOutside = event => {
        !this.state.collapsed && this.setState({
            collapsed: true
        });
    };

    renderLabel() {
        const { showLabel, title, required } = this.props;

        if (!showLabel) {
            return null;
        }

        return (
            <label className={cx(s.label, {
                [s.hasOffset]: this.props.labelPosition !== 'top'
            })}
            >
                {title}
                {required && <span>&nbsp;*</span>}
            </label>
        );
    }

    renderSelectField() {
        const
            { index, collapsed } = this.state,
            { frame, options, editable, invalid, showLabel, title, placeholder } = this.props;

        return (
            <div
                className={cx(s.select, s.selectField, this.props.className, {
                    [s.frame]: frame,
                    [s.redFrame]: invalid,
                    [s.spanStyle]: !editable,
                    [s.disabled]: !editable
                })}
                onClick={this.handleToggle}
            >
                {options[index]
                    ? <div className={s.chosenName}>
                        {options[index].chosenName || options[index].name}
                    </div>
                    : <div className={s.placeholder}>
                        {placeholder || !showLabel && title}
                    </div>}
                {editable && (collapsed
                    ? <IconAngleDown size={ICON_SIZE} thickness={ICON_THICKNESS} />
                    : <IconAngleUp size={ICON_SIZE} thickness={ICON_THICKNESS} />)}
            </div>
        );
    }

    renderDropdown() {
        const
            { collapsed } = this.state,
            { withIcon, placeholder, showLabel, title } = this.props,
            options = [{
                disabled: true,
                name: placeholder || !showLabel && title,
                selectable: true
            }, ...this.props.options];

        return (
            <div
                className={cx(s.dropdown, {
                    [s.collapsed]: collapsed
                })}
            >
                {options.map((option, index) =>
                    <div
                        key={index}
                        className={cx(s.option, this.props.className, {
                            [s.disabled]: option.disabled,
                            [s.selected]: index === this.state.index + 1
                        })}
                        onClick={option.selectable ? this.handleChoose.bind(this, index - 1) : null}
                    >
                        {option.name}
                        {withIcon && index === this.state.index && <div className={s.chosen}>
                            <IconApproved size={ICON_SIZE} />
                        </div>}
                    </div>
                )}
            </div>
        );
    }

    render() {
        return (
            <div className={cx(s.root, this.props.wrapperClassName, {
                [s.wide]: this.props.wide,
                [s.leftLabelPosition]: this.props.labelPosition === 'left',
                [s.rightLabelPosition]: this.props.labelPosition === 'right'
            })}
            >
                {this.renderLabel()}
                <div className={s.content}>
                    {this.renderSelectField()}
                    {this.renderDropdown()}
                    <div className={cx(s.message, {
                        [s.error]: this.props.invalid
                    })}
                    >
                        {this.props.error}
                    </div>
                </div>
            </div>
        );
    }
}

export default Select;
