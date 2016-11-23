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
