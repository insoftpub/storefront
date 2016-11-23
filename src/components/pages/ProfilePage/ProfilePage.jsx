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
