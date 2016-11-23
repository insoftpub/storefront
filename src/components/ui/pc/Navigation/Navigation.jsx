import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.scss';
import Link from '../../common/Link';
import { reduce, map, isEmpty, slice, debounce } from 'lodash';
import watchStores from '../../../../utils/decorators/watchStores';
import Container from '../../common/Container';
import Row from '../../common/Row';

@withStyles(s)
@watchStores('navigation')
class Navigation extends Component {
    static contextTypes = {
        getStore: PropTypes.func.isRequired,
        executeAction: PropTypes.func.isRequired
    };

    static propTypes = {
        children: PropTypes.array
    };

    getStoresState() {
        const { navigation } = this.context.getStore('navigation').getState();

        return {
            navigation
        };
    }

    renderLinks() {
        const { navigation } = this.state;

        return map(navigation, (link, index) => (
            <Link
                to={link.to}
                key={link.name}
                name={link.name}
                className={s.link}
                wrapperClassName={s.linkWrapper}
            />
        ));
    }

    render() {
        return (
            <div className={s.unit}>
                <Container>
                    <Row spaceBetween>
                        {this.renderLinks()}
                    </Row>
                </Container>
            </div>
        );
    }

}

export default Navigation;
