import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RadioButton from '../RadioButton';
import cx from 'classnames';
import s from './RadioGroup.scss';

@withStyles(s)
class RadioGroup extends Component {
    static propTypes = {
        items: pt.array,
        defaultActiveIndex: pt.number,
        horizontal: pt.bool,
        onChange: pt.func
    };

    static defaultProps = {
        defaultActiveIndex: -1,
        horizontal: false
    };

    constructor(props) {
        super(props);

        this.state = {
            activeRadioIndex: props.defaultActiveIndex
        };
    }

    handleActiveChange(index, radioName) {
        const
            { activeRadioIndex } = this.state,
            { onChange } = this.props;

        if (activeRadioIndex !== index) {
            this.setState({ activeRadioIndex: index });
        }

        onChange && onChange(radioName);
    }

    /*
        buttons: {
            title - used to show user
            name - used to differ radio buttons
        }
    */
    renderRadioButtons() {
        const
            { items } = this.props,
            { activeRadioIndex } = this.state;

        return items.map((item, index) => {
            return (
                <div
                    className={s.item}
                    key={index}
                >
                    <RadioButton
                        title={item.title}
                        name={item.name}
                        checked={activeRadioIndex === index}
                        onClick={this.handleActiveChange.bind(this, index)}
                    />
                </div>
            );
        });
    }

    render() {
        const { horizontal } = this.props;

        return (
            <div className={cx(s.root, {
                [s.rootHorizontal]: horizontal
            })}
            >
                {this.renderRadioButtons()}
            </div>
        );
    }

}

export default RadioGroup;
