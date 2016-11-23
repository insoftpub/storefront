import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginPage.scss';
import Container from '../../ui/common/Container';
import Login from '../../ui/common/Login';
import ContentFrame from '../../ui/common/ContentFrame';

const title = 'Sign in / Sign up';

@withStyles(s)
class LoginPage extends Component {
    static pageName = 'login';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
    }

    render() {
        return (
            <Container>
                <ContentFrame size='small' className={s.center}>
                    <Login />
                </ContentFrame>
            </Container>
        );
    }

}

export default LoginPage;
