import React, { Component, PropTypes } from 'react';
import Container from '../../ui/common/Container';
import Image from '../../ui/common/Image';
import Row from '../../ui/common/Row';
import Column from '../../ui/common/Column';
import Link from '../../ui/common/Link';

const title = 'Home';

class HomePage extends Component {
    static pageName = 'home';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Column hasRightMargin>
                        <Link to='/product/toga-lofery-iz-gladkoj-kozhi-432'>
                            <Image src='/images/homebanner1.png' />
                        </Link>
                    </Column>
                    <Column hasRightMargin>
                        <Link to='/products/novinki'>
                            <Image src='/images/homebanner2.png' />
                        </Link>
                    </Column>
                    <Column>
                        <Link to='/product/toga-oksfordy-431'>
                            <Image src='/images/homebanner3.png' />
                        </Link>
                    </Column>
                </Row>
            </Container>
        );
    }
}

export default HomePage;
