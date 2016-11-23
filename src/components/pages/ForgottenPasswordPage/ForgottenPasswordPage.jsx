import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ForgottenPasswordPage.scss';
import Title from '../../ui/common/Title';
import Container from '../../ui/common/Container';
import ForgottenPassword from '../../ui/common/ForgottenPassword';
import ContentFrame from '../../ui/common/ContentFrame';

const title = 'Have you forgotten your password?';

@withStyles(s)
class ForgottenPasswordPage extends Component {
    static pageName = 'forgottenPassword';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
    }

    render() {
        return (
            <Container>
                <Title
                    text={title}
                    subtext='If you have forgotten your password, enter your e-mail address and we will send you instructions to retrieve it.'
                    className={s.title}
                />
                <ContentFrame size='small' className={s.center}>
                    <ForgottenPassword />
                </ContentFrame>
            </Container>
        );
    }

}

export default ForgottenPasswordPage;
