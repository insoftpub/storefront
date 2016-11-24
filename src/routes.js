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

import React from 'react';
import Router from 'react-routing/src/Router';
import App from './components/App';
import CatalogPage from './components/pages/CatalogPage';
import ContentPage from './components/pages/ContentPage';
import CheckoutPage from './components/pages/CheckoutPage';
import LoginPage from './components/pages/LoginPage';
import ProductPage from './components/pages/ProductPage';
import ProfilePage from './components/pages/ProfilePage';
import RegisterPage from './components/pages/RegisterPage';
import NotFoundPage from './components/pages/NotFoundPage';
import ErrorPage from './components/pages/ErrorPage';
import ForgottenPasswordPage from './components/pages/ForgottenPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import CartPage from './components/pages/CartPage';
import CheckoutSuccessPage from './components/pages/CheckoutSuccessPage';
import { routes } from './config';
import statusCodes from './constants/statusCodes';
import staticService from './services/static';
import { isEmpty } from 'lodash';

/* eslint-disable arrow-parens */
const router = new Router(on => {
    on('*', async(state, next) => {
        const component = await next();

        return component && <App context={state.context} path={state.path}>{component}</App>;
    });

    on('*', async({ params, context, isServer }, next) => {
        if (isServer) {
            await context.executeAction('categories/list');
        }

        return await next();
    });

    on(routes.RESET_PASSWORD, async({ context, query }) => {
        const
            { code } = query,
            account = code
                ? await context.executeAction('user/find', {
                    password_reset_code: code
                })
                : {};

        return isEmpty(account)
            ? <NotFoundPage />
            : <ResetPasswordPage code={code} account={account} />;
    });

    on(routes.HOME, async({ params, context, query, isServer }) => {
        const
            page = query && query.page || 1,
            defer = context.executeAction('products/list', {
                page
            });

        if (isServer) {
            await defer;
        }

        return <CatalogPage />;
    });

    on(routes.PRODUCTS + '/:categorySlug', async({ params, context, query, isServer }) => {
        const
            page = query && query.page || 1,
            category = context
                .getStore('categories')
                .getState()
                .categoriesBySlug[params.categorySlug],
            defer = context.executeAction('products/list', {
                page,
                category_id: category.id
            });

        if (isServer) {
            await defer;
        }

        return <CatalogPage category={category.id} title={category.name} />;
    });

    on(routes.LOGIN, async() => <LoginPage />);

    on(routes.REGISTER, async() => <RegisterPage />);

    on(routes.CHECKOUT_SUCCESS, async() => <CheckoutSuccessPage />);

    on(routes.CATEGORY + '/:categoryId/:page?', async({ params }) => <CatalogPage categoryId={params.categoryId} page={params.page} />);

    on(routes.CHECKOUT, async() => <CheckoutPage />);

    on(routes.PRODUCT + '/:slug', async({ params, context, isServer }) => {
        if (isServer) {
            await context.executeAction('products/getBySlug', {
                slug: params.slug
            });
        }

        return <ProductPage slug={params.slug} />;
    });

    on(routes.PROFILE, async() => <ProfilePage />);

    on(routes.FORGOTTEN_PASSWORD, async() => <ForgottenPasswordPage />);

    on(routes.CART, async({ params }) => <CartPage params={params} />);

    on('*', async(state) => {
        const
            query = `/graphql?query={content(path:"${state.path}"){path,title,content,component}}`,
            response = await staticService(query),
            { data } = await response.json();

        return data && data.content && <ContentPage {...data.content} />;
    });

    on('error', (state, error) => state.statusCode === statusCodes.PAGE_NOT_FOUND
        ? <App context={state.context} error={error}><NotFoundPage /></App>
        : <App context={state.context} error={error}><ErrorPage /></App>
    );
});

/* eslint-enable arrow-parens */

export default router;
