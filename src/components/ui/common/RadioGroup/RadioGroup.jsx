/**
 * MIT License
 *
 * Copyright (c) 2016 InSoft Engineering / github.com/insoftpub
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
