import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Options.scss';
import { map, reduce, isEqual } from 'lodash';
import cx from 'classnames';

@withStyles(s)
class Options extends Component {
    static propTypes = {
        options: pt.object,
        onCreate: pt.func,
        className: pt.string
    };

    constructor(props) {
        super(props);

        props.onCreate && props.onCreate(this);

        this.state = {
            ...reduce(props.options, (memo, option, optionName) => ({
                ...memo,
                [optionName]: option[0]
            }), {})
        };
    }

    handleChange(data) {
        this.setState(data);
    }

    renderOption(option, optionName) {
        return (
            <div className={cx(s.container, s.margin)}>
                {map(option, value =>
                    <div
                        key={value.name}
                        className={cx(s.button, { [s.chosen]: isEqual(this.state[optionName], value) })}
                        onClick={this.handleChange.bind(this, { [optionName]: value })}
                    >
                        {value.name}
                    </div>)}
            </div>);
    }

    render() {
        return (
            <div className={cx(s.root, this.props.className)}>
                {map(this.props.options, (option, optionName) =>
                    <div key={optionName} className={s.option}>
                        <div className={s.title}>
                            {optionName}
                        </div>
                        {this.renderOption(option, optionName)}
                    </div>)}
            </div>
        );
    }
}

export default Options;
