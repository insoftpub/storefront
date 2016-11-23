import React, { Component, PropTypes as pt } from 'react';
import s from './Container.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import AngleUpIcon from '../../common/Icon/Icons/Controls/AngleUp.jsx';
import { COLOR_WHITE } from '../../../../constants/colors';
import mixin from '../../../../utils/decorators/mixinComponent';
import ScrollToMixin from '../../../mixins/ScrollToMixin';

@withStyles(s)
@mixin(ScrollToMixin)
class Container extends Component {
    static propTypes = {
        showScrollToTop: pt.bool,
        hasBottomPadding: pt.bool,
        hasTopPadding: pt.bool,
        hasLeftPadding: pt.bool,
        hasRightPadding: pt.bool,
        centeringContent: pt.bool,
        className: pt.string,
        children: pt.node
    };

    static defaultProps = {
        showScrollToTop: false,
        hasBottomPadding: true,
        hasTopPadding: true,
        hasLeftPadding: true,
        hasRightPadding: true,
        centeringContent: true
    };

    constructor(props) {
        super(props);

        this.handleClickScrollIcon = this.handleClickScrollIcon.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            scrollToTopIconVisible: false
        };
    }

    componentDidMount() {
        this.props.showScrollToTop && window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        this.props.showScrollToTop && window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const { scrollTop } = document.body;

        if (scrollTop === 0) {
            this.state.scrollToTopIconVisible && this.setState({ scrollToTopIconVisible: false });
        } else {
            !this.state.scrollToTopIconVisible && this.setState({ scrollToTopIconVisible: true });
        }
    }

    handleClickScrollIcon() {
        this.scrollTo({
            target: '$top',
            duration: 400
        });
    }

    renderSrollToTopIcon() {
        return (
            <AngleUpIcon
                className={cx(s.scrollToTopIcon, {
                    [s.visible]: this.state.scrollToTopIconVisible
                })}
                onClick={this.handleClickScrollIcon}
                color={COLOR_WHITE}
            />
        );
    }

    render() {
        return (
            <div
                className={cx(s.root, this.props.className, {
                    [s.hasBottomPadding]: this.props.hasBottomPadding,
                    [s.hasTopPadding]: this.props.hasTopPadding,
                    [s.hasLeftPadding]: this.props.hasLeftPadding,
                    [s.hasRightPadding]: this.props.hasRightPadding,
                    [s.centeringContent]: this.props.centeringContent
                })}
            >
                {this.props.showScrollToTop && this.renderSrollToTopIcon()}
                {this.props.children}
            </div>
        );
    }
}

export default Container;
