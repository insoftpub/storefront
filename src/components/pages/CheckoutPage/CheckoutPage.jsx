import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CheckoutPage.scss';
import Container from '../../ui/common/Container';
import Checkout from '../../ui/common/Checkout';

const title = 'Checkout';

@withStyles(s)
class CheckoutPage extends Component {
    static pageName = 'checkout';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
    }

    render() {
        return (
            <Container>
                <Checkout />
            </Container>
        );
    }

}

export default CheckoutPage;
