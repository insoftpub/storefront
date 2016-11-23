import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Location from '../../../../core/Location';
import s from './Link.scss';
import cx from 'classnames';
import { startsWith } from 'lodash';

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

@withStyles(s)
class Link extends Component {
    static contextTypes = {
        executeAction: pt.func.isRequired
    };

    static propTypes = {
        name: pt.string,
        to: pt.oneOfType([
            pt.string,
            pt.object
        ]).isRequired,
        onClick: pt.func,
        onMouseEnter: pt.func,
        className: pt.string,
        wrapperClassName: pt.string,
        underlined: pt.bool,
        custom: pt.bool,
        hasHoverAnimation: pt.bool,
        children: pt.node,
        icon: pt.node
    };

    static defaultProps = {
        hasHoverAnimation: true,
        underlined: false,
        custom: false
    };

    handleNativeLinkClick = event => {
        let allowTransition = true,
            clickResult;

        const to = this.props && this.props.to;

        if (this.props && this.props.onClick) {
            clickResult = this.props.onClick(event);
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return;
        }

        if (clickResult === false || event.defaultPrevented === true) {
            allowTransition = false;
        }

        /* To avoid Uncaught SecurityError: Failed to execute 'pushState' on 'History':
                                            A history state object with URL 'mailto:*@*.**' cannot be created
         */
        if (!('' + to).toLowerCase().startsWith('mailto:')) {
            event.preventDefault();

            if (allowTransition) {
                const link = event.currentTarget;

                if (to) {
                    this.context.executeAction('navigate/to', { url: this.props.to });
                } else {
                    this.context.executeAction('navigate/to', {
                        url: link.pathname,
                        search: link.search
                    });
                }
            }
        }
    };

    handleCustomLinkClick = () => {
        const assign = startsWith(this.props.to, 'http');

        this.context.executeAction('navigate/to', { url: this.props.to, assign });
    };

    renderIcon() {
        return (
            <span className={s.icon}>
                {this.props.icon}
            </span>
        );
    }

    renderNativeLink() {
        const {
            underlined,
            name,
            wrapperClassName,
            className,
            onMouseEnter,
            to
        } = this.props;

        return (
            <span className={wrapperClassName}>
                <a
                    key={`link-${name}`}
                    className={cx(s.aTag, className, {
                        [s.underlined]: underlined
                    })}
                    href={Location.createHref(to)}
                    onClick={this.handleNativeLinkClick}
                    onMouseEnter={onMouseEnter}
                    data-onclick={to}
                >
                    {this.props.children ? this.props.children : name}
                </a>
            </span>
        );
    }

    renderCustomLink() {
        const {
            className,
            name,
            hasHoverAnimation
        } = this.props;

        return (
            <div
                className={cx(s.custom, className, {
                    [s.hoverAnimation]: hasHoverAnimation
                })}
                onClick={this.handleCustomLinkClick}
            >
                {this.props.children ? this.props.children : name}
            </div>
        );
    }

    render() {
        return !this.props.custom ? this.renderNativeLink() : this.renderCustomLink();
    }
}

export default Link;
