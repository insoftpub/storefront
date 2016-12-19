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
import watchStores from '../../../../utils/decorators/watchStores';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Profile.scss';
import TabsPanel from '../TabsPanel';
import Tab from '../Tab';
import Form from '../Form';
import Orders from '../Orders';
import getUserInfo from './forms/userInfo';

@withStyles(s)
@watchStores('user')
class Profile extends Component {
    static contextTypes = {
        getStore: pt.func.isRequired,
        executeAction: pt.func.isRequired,
        getUserAgent: pt.func.isRequired
    };

    state = {
        isEditMode: false
    };

    getStoresState() {
        const user = this.context.getStore('user').getState().userInfo;

        return { user };
    }

    handleSubmitClick = values => {
        const { isEditMode } = this.state;

        if (isEditMode) {
            this.editUserInfo(values);
        } else {
            this.setState({ isEditMode: true });
        }
    };

    handleCancelClick = () => this.setState({ isEditMode: false });

    editUserInfo(values) {
        const
            { user } = this.state,
            params = {
                ...values,
                id: user.id
            };

        this.context.executeAction('user/update', params)
            .then(() => {
                this.setState({ isEditMode: false });
            });
    }

    render() {
        const
            { isEditMode, user } = this.state,
            { isDesktop } = this.context.getUserAgent();

        return (
            <div className={s.root}>
                <TabsPanel>
                    <Tab title='Personal info'>
                        <Form
                            items={getUserInfo(this, s)}
                            showLabels
                            labelsPosition={isDesktop ? 'left' : 'top'}
                            onRef={userInfoForm => this.userInfoForm = userInfoForm}
                            editable={isEditMode}
                            onSubmit={this.handleSubmitClick}
                        />
                    </Tab>
                    <Tab title='Orders'>
                        <Orders accountId={user.id} />
                    </Tab>
                </TabsPanel>
            </div>
        );
    }

}

export default withStyles(s)(Profile);
