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
import s from './Panel.scss';
import cx from 'classnames';
import IconExpand from '../Icon/Icons/Controls/AngleDown.jsx';
import IconCollapse from '../Icon/Icons/Controls/AngleUp.jsx';
import Collapse from '../Collapse';
import { COLOR_BLACK as COLOR } from '../../../../constants/colors';
import { SIZE_EXTRA_SMALL as ICON_SIZE, THICKNESS_THIN as ICON_THICKNESS } from '../../../../constants/icon';

@withStyles(s)
class Panel extends Component {
    static propTypes = {
        id: pt.string,
        expanded: pt.bool,
        color: pt.string,
        iconSize: pt.object,
        collapsible: pt.bool,
        flexible: pt.bool,
        title: pt.string,
        flexGrow: pt.number,
        onExpand: pt.func,
        onCollapse: pt.func,
        className: pt.string,
        titleClassName: pt.string,
        children: pt.node
    };

    static defaultProps = {
        color: COLOR,
        iconSize: ICON_SIZE,
        collapsible: false,
        expanded: false,
        flexible: true,
        flexGrow: 1
    };

    constructor(props) {
        super(props);

        this.state = {
            expanded: props.expanded
        };
    }

    componentWillReceiveProps(nextProps) {
        nextProps.expanded !== this.props.expanded && this.setState({
            expanded: nextProps.expanded
        });
    }

    handleToggleLink = () => {
        const
            { onExpand, onCollapse } = this.props,
            { expanded } = this.state;

        if (onExpand) {
            expanded ? onCollapse() : onExpand();
        }
        this.setState({
            expanded: !expanded
        });
    };

    renderPanelContent(content) {
        return (
            <div>
                <div
                    id={this.props.id}
                    className={cx(s.panelContent, {
                        [s.collapsible]: this.props.collapsible
                    })}
                >
                    {content}
                </div>
            </div>
        );
    }

    renderHeaderIcon() {
        const { color, iconSize } = this.props;

        if (!this.props.collapsible) {
            return null;
        }

        if (this.state.expanded) {
            return <IconCollapse size={iconSize} color={color} thickness={ICON_THICKNESS}/>;
        } else {
            return <IconExpand size={iconSize} color={color} thickness={ICON_THICKNESS} />;
        }
    }

    render() {
        const { flexGrow, className, titleClassName } = this.props;

        return (
            <div
                className={cx(s.root, className, {
                    [s.flexible]: this.props.flexible
                })}
                style={{ flexGrow }}
            >
                <div className={s.title} onClick={this.handleToggleLink} data-id={this.props.id}>
                    {this.props.title && <div className={cx(s.header, titleClassName)}>{this.props.title}</div>}
                    {this.renderHeaderIcon()}
                </div>
                {this.props.collapsible
                    ? <Collapse expanded={this.state.expanded}>
                        {this.renderPanelContent(this.props.children)}
                    </Collapse>
                    : this.renderPanelContent(this.props.children)
                }
            </div>
        );
    }
}

export default Panel;
