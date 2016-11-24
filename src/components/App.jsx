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
