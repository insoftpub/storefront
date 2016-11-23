import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RegisterPage.scss';
import Register from '../../ui/common/Register';
import Container from '../../ui/common/Container';
import Title from '../../ui/common/Title';
import ContentFrame from '../../ui/common/ContentFrame';

const title = 'Sign up';

@withStyles(s)
class RegisterPage extends Component {
    static pageName = 'register';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
    }

    render() {
        return (
            <Container>
                <Title text={title} className={s.title} />
                <ContentFrame size='small' className={s.center}>
                    <Register />
                </ContentFrame>
            </Container>
        );
    }
}

export default RegisterPage;
