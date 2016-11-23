import React, { Component, PropTypes as pt } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ToggleButton.scss';

@withStyles(s)
class ToggleButton extends Component {
    static propTypes = {
        onChange: pt.func,
        title: pt.string,
        checked: pt.bool,
        className: pt.string,
        labelClassName: pt.string,
        name: pt.string
    };

    static defaultProps = {
        showLabel: false,
        checked: false
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
            { title, name } = this.props;

        this.setState({ checked });
        this.props.onChange && this.props.onChange({ checked, title, id: name });
    };

    render() {
        return (
            <div
                onClick={this.handleChange}
                className={cx(s.root, this.props.className)}
            >
                <div
                    className={cx(s.inner, this.props.labelClassName, {
                        [s.checked]: this.state.checked
                    })}
                >
                    {this.props.title}
                </div>
            </div>
        );
    }
}

export default ToggleButton;
