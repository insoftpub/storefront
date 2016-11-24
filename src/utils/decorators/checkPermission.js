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
import hoistStatics from 'hoist-non-react-statics';
import { some } from 'lodash';
import watchStores from './watchStores';

const
    checkPermission = (...roles) => WrappedComponent => {
        @watchStores(
            'user'
        )
        class PermissionChecker extends Component {
            static displayName = `Permission(${WrappedComponent.displayName || WrappedComponent.name})`;

            static contextTypes = {
                getStore: pt.func.isRequired
            };

            static propTypes = {
                children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
            };

            getStoresState() {
                return {
                    user: this.context.getStore('user').getState()
                };
            }

            roleCheckers = {
                guest: user => !user.isLogged,
                client: user => user.isLogged
            };

            userInRole = role => {
                const { user } = this.state;

                return this.roleCheckers[role] && this.roleCheckers[role](user);
            };

            render() {
                const
                    { children, ...rest } = this.props;

                roles.length === 0 && roles.push('client');

                if (some(roles, this.userInRole)) {
                    return (
                        <WrappedComponent {...rest}>
                            {children}
                        </WrappedComponent>
                    );
                }

                return null;
            }
        }

        return hoistStatics(PermissionChecker, WrappedComponent);
    };

export default checkPermission;
