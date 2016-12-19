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
import watchStores from '../../../../utils/decorators/watchStores';
import s from './Checkout.scss';
import IconArrowLeft from '../Icon/Icons/ArrowLeft.jsx';
import Row from '../Row';
import Column from '../Column';
import Section from '../Section';
import Button from '../Button';
import TabsPanel from '../TabsPanel';
import Link from '../Link';
import Tab from '../Tab';
import Form from '../Form';
import DesktopCartTable from '../../pc/CartTable';
import MobileCartTable from '../../mobile/CartTable';
import OrderSummary from '../OrderSummary';
import { routes } from '../../../../config';
import { SIZE_SMALL } from '../../../../constants/icon';
import { COLOR_WHITE } from '../../../../constants/colors';
import { AutoAffix } from 'react-overlays';
import getDeliveryAddressItems from './forms/deliveryAddress';
import getPaymentMethodItems from './forms/payment';
import getLoginItems from './forms/login';

const
    ORDER_FORM_OFFSET_TOP = 30,
    DELIVERY_TAB_INDEX = 0;

@withStyles(s)
@watchStores(
    'user',
    'cart',
    'navigation'
)
class Checkout extends Component {
    static contextTypes = {
        getStore: pt.func.isRequired,
        executeAction: pt.func.isRequired,
        getUserAgent: pt.func.isRequired
    };

    state = {
        activeTab: DELIVERY_TAB_INDEX,
        orderProcessing: false,
        loginErrors: null,
        orderErrors: null
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.orderProcessing;
    }

    getStoresState() {
        const
            { backPath } = this.context.getStore('navigation').getState(),
            { products, cartId, cartLoaded } = this.context.getStore('cart').getState(),
            { userInfo: user, isLogged } = this.context.getStore('user').getState();

        return {
            backPath,
            cartId,
            products,
            cartLoaded,
            user,
            isLogged
        };
    }

    getUser({ email, password }) {
        const { user, isLogged } = this.state;

        if (!isLogged) {
            return this.context.executeAction('user/register', {
                email,
                password
            });
        } else {
            return Promise.resolve(user);
        }
    }

    handleDeliveryAddressSubmit = values => {
        const
            { products, cartId } = this.state,
            { email, password, ...contactInfo } = values;

        this.setState({ orderProcessing: true });
        this.getUser({ email, password })
            .then(user => Promise.all([
                this.context.executeAction('user/update', {
                    email,
                    ...contactInfo
                }),
                this.context.executeAction('orders/create', {
                    user,
                    products,
                    cartId,
                    email,
                    ...contactInfo
                })
                    .then(() => this.context.executeAction('navigate/to', { url: routes.CHECKOUT_SUCCESS }))
            ]))
            .catch(error => this.setState({
                orderErrors: error.details.email,
                orderProcessing: false
            }));
    };

    handleLoginSubmit = data => {
        this.context.executeAction('user/login', data)
            .then(() => this.setState({ activeTab: DELIVERY_TAB_INDEX }))
            .catch(error => this.setState({ loginErrors: error.message }));
    };

    handleActiveTabChange = index => {
        this.setState({ activeTab: index });
    };

    renderHeader() {
        return (
            <header className={s.header}>
                <Link
                    name='{logo}'
                    wrapperClassName={s.logo}
                    to={routes.HOME}
                />
                <nav className={s.nav}>
                    <Link
                        custom
                        className={s.backLink}
                        to={this.state.backPath}
                    >
                        <IconArrowLeft size={SIZE_SMALL} />
                        &nbsp;
                        Back to shopping
                    </Link>
                </nav>
            </header>
        );
    }

    render() {
        const
            { isLogged, products, cartLoaded, cartId } = this.state,
            { isDesktop, isTablet } = this.context.getUserAgent();

        return (
            <div className={s.root}>
                {isDesktop && this.renderHeader()}
                <Row>
                    <Column
                        hasRightMargin
                        alignItems='stretch'
                        flowDirection='bottom'
                        className={s.leftColumn}
                    >
                        <Section>
                            {isDesktop || isTablet
                                ? <DesktopCartTable
                                    cartLoaded={cartLoaded}
                                    cartId={cartId}
                                    products={products}
                                />
                                : <MobileCartTable
                                    cartLoaded={cartLoaded}
                                    cartId={cartId}
                                    products={products}
                                />}
                        </Section>
                        <Section title='ADDRESS' hasSeparator>
                            <TabsPanel
                                className={s.marginTop}
                                activeTab={this.state.activeTab}
                                onChange={this.handleActiveTabChange}
                            >
                                <Tab title={!isLogged ? 'First time here?' : 'Contact information'}>
                                    <Form
                                        name='deliveryAddress'
                                        items={getDeliveryAddressItems(this)}
                                        showLabels
                                        labelsPosition={isDesktop ? 'left' : 'top'}
                                        onSubmit={this.handleDeliveryAddressSubmit}
                                    />
                                </Tab>
                                {!isLogged && <Tab title='Login'>
                                    <Form
                                        items={getLoginItems(this, s)}
                                        showLabels
                                        labelsPosition={isDesktop ? 'left' : 'top'}
                                        onSubmit={this.handleLoginSubmit}
                                        errors={this.state.errors}
                                    />
                                </Tab>}
                            </TabsPanel>
                        </Section>
                        <Section title='Payment' hasSeparator>
                            <Form
                                items={getPaymentMethodItems(this)}
                            />
                        </Section>
                        <Section centered className={s.controls}>
                            <Button
                                form='deliveryAddress'
                                color={COLOR_WHITE}
                                isSubmit
                            >
                                Order
                            </Button>
                        </Section>
                    </Column>
                    <Column
                        alignItems='stretch'
                        className={s.rightColumn}
                        flowDirection='bottom'
                        hasLeftMargin
                    >
                        <AutoAffix viewportOffsetTop={ORDER_FORM_OFFSET_TOP}>
                            <div className={s.orderForm}>
                                <OrderSummary />
                                <Button
                                    form='deliveryAddress'
                                    isSubmit
                                >
                                    Order
                                </Button>
                            </div>
                        </AutoAffix>
                    </Column>
                </Row>
            </div>
        );
    }
}

export default Checkout;
