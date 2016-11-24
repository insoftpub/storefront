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
import { isEmpty } from 'lodash';
import s from './CollapsibleLink.scss';
import Link from '../../common/Link';
import { TransitionMotion, spring } from 'react-motion';
import IconAngleRight from '../Icon/Icons/Controls/RightAngle.jsx';
import { SIZE_SMALL as ICON_SIZE } from '../../../../constants/icon';

@withStyles(s)
class CollapsibleLink extends Component {
    static propTypes = {
        hasArrow: pt.bool,
        name: pt.string,
        to: pt.oneOfType([pt.string, pt.object]).isRequired,
        onClick: pt.func,
        links: pt.array,
        className: pt.string
    };

    static defaultProps = {
        hasArrow: false
    };

    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false
        };
    }

    handleClick = () => {
        if (!isEmpty(this.props.links)) {
            this.setState({
                showDropdown: !this.state.showDropdown
            });
        }
    };

    willLeave(params) {
        return {
            maxHeight: spring(0, {
                stiffness: 120,
                damping: 17,
                precision: 60
            }),
            opacity: spring(0)
        };
    }

    willEnter(params) {
        return {
            maxHeight: 0,
            opacity: 0
        };
    }

    renderLink(props = this.props) {
        return (
            <Link
                key={`link-${props.name}`}
                name={props.name}
                to={props.to}
                className={s.sublink}
                wrapperClassName={s.wrapperSublink}
                onClick={this.props.onClick}
            />);
    }

    renderDropdown() {
        const
            { showDropdown } = this.state,
            LINK_HEIGHT = 35,
            DROPDOWN_MAX_HEIGHT = LINK_HEIGHT * this.props.links.length;

        return (
            <TransitionMotion
                willLeave={this.willLeave}
                willEnter={this.willEnter}
                styles={showDropdown ? [{
                    key: 'dropdown',
                    style: {
                        maxHeight: spring(DROPDOWN_MAX_HEIGHT, {
                            stiffness: 120,
                            damping: 17,
                            precision: 60
                        }),
                        opacity: spring(1)
                    }
                }] : []}
            >
                {styles =>
                    <div className={s.dropdown}>
                        {styles.map(({ style } = {}, index) =>
                            <div key={index} className={s.dropdownInner} style={style}>
                                {this.props.links.map(link => this.renderLink(link))}
                            </div>
                        )}
                    </div>
                }
            </TransitionMotion>
        );
    }

    render() {
        return (
            <div className={s.root}>
                <div className={s.row} onClick={this.handleClick}>
                    <a className={this.props.className}>
                        {this.props.name}
                    </a>
                    {this.props.hasArrow && <IconAngleRight size={ICON_SIZE} />}
                </div>
                {!isEmpty(this.props.links) && this.renderDropdown()}
            </div>
        );
    }

}

export default CollapsibleLink;
