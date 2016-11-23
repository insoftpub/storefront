import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CheckoutSuccessPage.scss';
import Container from '../../ui/common/Container';
import Title from '../../ui/common/Title';
import CheckoutSuccess from '../../ui/common/CheckoutSuccess';

const title = 'Order is accepted';

@withStyles(s)
class CheckoutSuccessPage extends Component {
    static pageName = 'success-checkout';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
    }

    render() {
        return (
            <Container>
                <Title text={title}/>
                <CheckoutSuccess />
            </Container>
        );
    }

}

export default CheckoutSuccessPage;
