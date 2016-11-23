import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ResetPasswordPage.scss';
import Container from '../../ui/common/Container';
import NewPassword from '../../ui/common/NewPassword';

const title = 'Reset Password';

@withStyles(s)
class ResetPasswordPage extends Component {
    static pageName = 'resetPassword';

    static contextTypes = {
        setTitle: pt.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
    }

    render() {
        return (
            <Container showScrollToTop>
                <NewPassword {...this.props} />
            </Container>
        );
    }

}

export default ResetPasswordPage;
