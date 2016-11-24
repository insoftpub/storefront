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

import React, { Component, PropTypes } from 'react';
import Location from '../../../../core/Location';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { isEmpty } from 'lodash';
import s from './DropdownLink.scss';
import cx from 'classnames';
import Link from '../../common/Link';

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

@withStyles(s)
class DropdownLink extends Component {
    static propTypes = {
        name: PropTypes.string,
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        onClick: PropTypes.func,
        links: PropTypes.array,
        className: PropTypes.string
    };


    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false
        };
    }

    handleClick = event => {
        this.setState({
            showDropdown: false
        });

        let allowTransition = true,
            clickResult;

        if (this.props && this.props.onClick) {
            clickResult = this.props.onClick(event);
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return;
        }

        if (clickResult === false || event.defaultPrevented === true) {
            allowTransition = false;
        }

        event.preventDefault();

        if (allowTransition) {
            const link = event.currentTarget;

            if (event && event.currentTarget && event.currentTarget.dataset.onclick) {
                Location.push(event.currentTarget.dataset.onclick);
            } else {
                Location.push({
                    pathname: link.pathname,
                    search: link.search
                });
            }
        }
    };


    handleMouseOver = () => {
        if (!isEmpty(this.props.links)) {
            this.setState({
                showDropdown: true
            });
        }
    };

    renderLink(props = this.props) {
        return (
            <Link
                name={props.name}
                to={props.to}
                onClick={this.handleClick}
                className={props.className}
            />);
    }

    renderDropdown() {
        const { showDropdown } = this.state;

        return (
            <span className={s.dropdown}>
                {showDropdown && this.props.links.map(link => this.renderLink(link))}
            </span>
        );
    }

    render() {
        return (
            <span
                className={cx(
                    this.props.className,
                    s.root
                )}
                onMouseOver={this.handleMouseOver}
            >
                {this.renderLink(this.props)}
                {!isEmpty(this.props.links) && this.renderDropdown()}
            </span>
        );
    }

}

export default DropdownLink;
