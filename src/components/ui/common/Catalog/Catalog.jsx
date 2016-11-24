/**
 * MIT License
 *
 * Copyright (c) 2016 InSoft Engineering / github.com/insoftpub
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
