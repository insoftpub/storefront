import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import watchStores from '../../../../utils/decorators/watchStores';
import s from './Catalog.scss';
import ProductList from '../ProductsList';

@withStyles(s)
@watchStores(
    'products',
    'categories'
)
class Catalog extends Component {
    static contextTypes = {
        getStore: pt.func.isRequired,
        executeAction: pt.func.isRequired
    };

    static propTypes= {
        category: pt.string
    };

    state = {
        loading: false
    };

    getStoresState() {
        const { page, total, products } = this.context.getStore('products').getState();

        return { page, total, products };
    }

    handleNextPageClick = page => {
        this.loadProducts(page);
    };

    loadProducts(page = 1) {
        const params = this.props.category
            ? {
                page,
                category_id: this.props.category
            } : { page };

        return this.context.executeAction('products/list', params);
    }

    render() {
        return (
            <ProductList
                hasPagination
                loading={this.state.loading}
                products={this.state.products}
                total={this.state.total}
                currentPage={this.state.page}
                onNextPage={this.handleNextPageClick}
            />
        );
    }
}

export default Catalog;
