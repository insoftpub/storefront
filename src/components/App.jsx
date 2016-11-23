import React, { Component, PropTypes as pt } from 'react';
import emptyFunction from '../../node_modules/fbjs/lib/emptyFunction';
import ComputerLayout from './layouts/ComputerLayout';
import MobileLayout from './layouts/MobileLayout';
import EmptyLayout from './layouts/EmptyLayout';
import s from './styles/app.scss';
import watchStores from '../utils/decorators/watchStores';
import { includes } from 'lodash';
import { mobilePagesWithFooter, mobilePagesWithBackIcon, emptyLayoutPages } from '../config.js';

@watchStores(
    'progress'
)
class App extends Component {
    static childContextTypes = {
        getUserAgent: pt.func.isRequired,
        getCookie: pt.func.isRequired,
        setCookie: pt.func.isRequired,
        insertCss: pt.func.isRequired,
        insertPaginationInfo: pt.func.isRequired,
        setTitle: pt.func.isRequired,
        onSetMeta: pt.func.isRequired,
        onPageNotFound: pt.func.isRequired,
        getStore: pt.func.isRequired,
        executeAction: pt.func.isRequired
    };

    static propTypes = {
        context: pt.shape({
            getUserAgent: pt.func,
            getCookie: pt.func,
            setCookie: pt.func,
            insertCss: pt.func,
            insertPaginationInfo: pt.func,
            setTitle: pt.func,
            onSetMeta: pt.func,
            onPageNotFound: pt.func,
            getStore: pt.func,
            executeAction: pt.func
        }),
        path: pt.string,
        children: pt.node.isRequired,
        error: pt.object
    };

    getStoresState() {
        const { showProgress } = this.props.context.getStore('progress').getState();

        return {
            showProgress
        };
    }

    getChildContext() {
        const context = this.props.context;

        return {
            getUserAgent: context.getUserAgent || emptyFunction,
            insertCss: context.insertCss || emptyFunction,
            insertPaginationInfo: context.insertPaginationInfo || emptyFunction,
            getCookie: context.getCookie || emptyFunction,
            setCookie: context.setCookie || emptyFunction,
            setTitle: context.setTitle || emptyFunction,
            onSetMeta: context.onSetMeta || emptyFunction,
            onPageNotFound: context.onPageNotFound || emptyFunction,
            getStore: context.getStore || emptyFunction,
            executeAction: context.executeAction || emptyFunction
        };
    }

    componentWillMount() {
        const { insertCss } = this.props.context;

        this.removeCss = insertCss(s);
    }
    
    componentDidMount() {
        const { context, path } = this.props;

        context.executeAction('navigate/setStartPage', path);
        context.executeAction('session/restore');
    }

    componentWillUnmount() {
        this.removeCss();
    }

    getCurrentPageName(component) {
        return component.type.pageName || (component.type.ComposedComponent && component.type.ComposedComponent.pageName);
    }

    renderEmptyLayout() {
        return (
            <EmptyLayout showProgress={this.state.showProgress}>
                {this.props.children}
            </EmptyLayout>
        );
    }

    renderDesktopLayout() {
        return (
            <ComputerLayout showProgress={this.state.showProgress}>
                {this.props.children}
            </ComputerLayout>
        );
    }

    renderMobileLayout(userAgent) {
        const
            { children } = this.props,
            { showProgress } = this.state,
            currentPage = this.getCurrentPageName(children),
            showFooter = includes(mobilePagesWithFooter, currentPage),
            showBackIcon = includes(mobilePagesWithBackIcon, currentPage);

        return (
            <MobileLayout
                showProgress={showProgress}
                hasFooter={showFooter}
                showBackIcon={showBackIcon}
            >
                {children}
            </MobileLayout>
        );
    }

    render() {
        const
            { children, context } = this.props,
            userAgent = context.getUserAgent(),
            isEmptyLayout = userAgent.isDesktop && includes(emptyLayoutPages, this.getCurrentPageName(children));


        if (isEmptyLayout) {
            return this.renderEmptyLayout();
        }

        if (!userAgent.isDesktop) {
            return this.renderMobileLayout(userAgent);
        } else {
            return this.renderDesktopLayout();
        }
    }
}

export default App;
