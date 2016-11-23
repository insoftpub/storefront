import React, { Component, PropTypes } from 'react';
import Title from '../../ui/common/Title';
import Container from '../../ui/common/Container';
import Cart from '../../ui/common/Cart';

const title = 'Cart';

class CartPage extends Component {
    static pageName = 'cart';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
    }

    render() {
        return (
            <Container>
                <Title text={title} />
                <Cart />
            </Container>
        );
    }

}

export default CartPage;
