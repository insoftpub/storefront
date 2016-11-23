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
