import React, { Component, PropTypes as pt } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Checkbox.scss';
import IconSquare from '../Icon/Icons/Square.jsx';
import IconChecked from '../Icon/Icons/Checked.jsx';
import { SIZE_SMALL as ICON_SIZE } from '../../../../constants/icon';

@withStyles(s)
class Checkbox extends Component {
    static propTypes = {
        onChange: pt.func,
        title: pt.string,
        checked: pt.bool,
        className: pt.string,
        labelClassName: pt.string,
        name: pt.string,
        disabled: pt.bool,
        value: pt.string
    };

    static defaultProps = {
        showLabel: false,
        checked: false,
        disabled: false,
        value: 'checked'
    };

    constructor(props) {
        super(props);

        this.state = {
            checked: props.checked
        };
    }

    componentWillReceiveProps(nextProps) {
        const { checked } = this.state;

        if (checked !== nextProps.checked) {
            this.setState({ checked: nextProps.checked });
        }
    }

    handleChange = () => {
        const
            checked = !this.state.checked,
            value = checked ? this.props.value : '';

        this.setState({ checked });
        this.props.onChange && this.props.onChange(value);
    };

    render() {
        const { disabled } = this.props;

        return (
            <div
                className={cx(
                    s.root,
                    this.props.className, {
                        [s.disabled]: disabled
                    }
                )}
                onClick={!disabled && this.handleChange}
            >
                <div className={s.icon}>
                    <div className={s.square} >
                        <IconSquare size={ICON_SIZE} />
                    </div>
                    {this.state.checked
                        && <div className={s.approved} >
                            <IconChecked size={ICON_SIZE} />
                        </div>}
                </div>
                <div className={cx(this.props.labelClassName, s.title)}>
                    {this.props.title}
                </div>
            </div>
        );
    }
}

export default Checkbox;
