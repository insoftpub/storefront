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
import watchStores from '../../../utils/decorators/watchStores';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProfilePage.scss';
import Title from '../../ui/common/Title';
import Container from '../../ui/common/Container';
import Profile from '../../ui/common/Profile';
import Link from '../../ui/common/Link';
import { routes } from '../../../config';
import checkPermission from '../../../utils/decorators/checkPermission';

const title = 'Profile';

@checkPermission()
@withStyles(s)
@watchStores(
    'user'
)
class ProfilePage extends Component {
    static pageName = 'profile';

    static contextTypes = {
        getStore: pt.func.isRequired,
        executeAction: pt.func.isRequired,
        setTitle: pt.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
    }

    handleLogout = () => {
        this.context.executeAction('user/logout')
            .then(() => this.context.executeAction('navigate/to', { url: routes.HOME }));
    }

    render() {
        return (
            <Container>
                <div className={s.header}>
                    <Title text={title} />
                    <Link
                        underlined
                        className={s.logout}
                        to=''
                        name='Sign out'
                        onClick={this.handleLogout}
                    />
                </div>
                <Profile />
            </Container>
        );
    }
}

export default ProfilePage;
