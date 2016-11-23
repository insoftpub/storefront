import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Radio from '../Icon/Icons/Radio.jsx';
import { SIZE_SMALL as ICON_SIZE } from '../../../../constants/icon';
import s from './RadioButton.scss';

@withStyles(s)
class RadioButton extends Component {
    static propTypes = {
        title: pt.string.isRequired,
        checked: pt.bool,
        name: pt.string,
        onClick: pt.func
    };

    static defaultProps = {
        checked: false
    };

    constructor(props) {
        super(props);

        this.state = {
            checked: props.checked
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.checked !== nextProps.checked) {
            this.setState({ checked: nextProps.checked });
        }
    }

    handleClick = () => {
        const { name, onClick } = this.props;

        onClick && onClick(name);
    };

    render() {
        return (
            <div
                className={s.root}
                onClick={this.handleClick}
            >
                <Radio
                    className={s.icon}
                    size={ICON_SIZE}
                    checked={this.state.checked}
                />
                <div className={s.title}>
                    {this.props.title}
                </div>
            </div>
        );
    }

}

export default RadioButton;
