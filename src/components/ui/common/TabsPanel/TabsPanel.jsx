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
import cx from 'classnames';
import s from './TabsPanel.scss';
import { reduce } from 'lodash';

@withStyles(s)
class TabsPanel extends Component {
    static propTypes = {
        defaultTab: pt.number,
        activeTab: pt.number,
        onChange: pt.func,
        children: pt.node,
        className: pt.string
    };

    static defaultProps = {
        defaultTab: 0,
        activeTab: 0
    };

    constructor(props) {
        super(props);

        this.state = {
            activeTabIndex: props.defaultTab
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeTab !== this.state.activeTabIndex) {
            this.setState({ activeTabIndex: nextProps.activeTab });
        }
    }

    handleActiveTabChange(index) {
        const
            { activeTabIndex } = this.state,
            { onChange } = this.props;

        if (index !== activeTabIndex) {
            this.setState({ activeTabIndex: index });

            onChange && onChange(index);
        }
    }

    renderHeaders() {
        const
            { children } = this.props,
            { activeTabIndex } = this.state;

        return reduce(children, (memo, item, index) => {
            if (item) {
                memo.push(
                    <div
                        className={cx(s.headLink, {
                            [s.activeHeadLink]: index === activeTabIndex
                        })}
                        onClick={this.handleActiveTabChange.bind(this, index)}
                        key={index}
                    >
                        {item.props.title || index}
                    </div>
                );
            }

            return memo;
        }, []);
    }

    renderContent() {
        const
            { children } = this.props,
            { activeTabIndex } = this.state;

        return children.map((item, index) => {
            return (
                <div
                    className={cx(s.contentItem, {
                        [s.activeContentItem]: index === activeTabIndex
                    })}
                    key={index}
                >
                    {item}
                </div>
            );
        });
    }

    render() {
        return (
            <div className={cx(s.root, this.props.className)}>
                <div className={s.header}>
                    {this.renderHeaders()}
                </div>
                <div className={s.content}>
                    {this.renderContent()}
                </div>
            </div>
        );
    }

}

export default TabsPanel;
