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
import { COLOR_BLACK } from '../../../../constants/colors';
import { isUndefined, find, isEmpty, map, reduce, includes } from 'lodash';
import s from './Product.scss';
import watchStores from '../../../../utils/decorators/watchStores';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ImageViewer from '../../common/ImageViewer';
import Row from '../../common/Row';
import Column from '../../common/Column';
import Link from '../Link';
import ProductInfo from '../../common/ProductInfo';
import RecommendedProducts from '../RecommendedProducts/RecommendedProducts';
import ProductDescription from '../ProductDescription';
import Options from '../Options';
import Button from '../Button';
import Separator from '../Separator';
import IconTriangleRight from '../Icon/Icons/Controls/TriangleRight.jsx';
import Promise from 'bluebird';
import { SIZE_EXTRA_SMALL } from '../../../../constants/icon';
import { routes } from '../../../../config';


@withStyles(s)
@watchStores(
    'products',
    'cart'
)
class Product extends Component {
    static contextTypes = {
        getStore: pt.func.isRequired,
        executeAction: pt.func.isRequired,
        setTitle: pt.func.isRequired,
        onSetMeta: pt.func.isRequired
    };

    static propTypes = {
        slug: pt.string
    };

    state = {
        loadingRecommendedProducts: false,
        showProceedToCheckoutLink: false
    };

    getStoresState() {
        const
            { products } = this.context.getStore('products').getState(),
            { cartId } = this.context.getStore('cart').getState(),
            product = find(products, { slug: this.props.slug });

        if (!isEmpty(product)) {
            this.context.setTitle(product.name);
            this.context.onSetMeta('description', `${product.manufacturer_name} ${product.name} ${product.sku}`);
        }

        return { products, product, cartId };
    }

    componentDidMount() {
        if (!this.hasRecommendedProducts(this.state.product)) {
            this.loadProduct(this.props.slug);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.slug !== nextProps.slug) {
            // Go to recommended product from product page.
            const product = find(this.state.products, { slug: nextProps.slug });

            if (!product) {
                this.loadProduct(nextProps.slug);
            } else {
                this.setState({ product });
            }
        }
    }

    getCart() {
        const { cartId } = this.state;

        if (!cartId) {
            return this.context.executeAction('cart/create');
        } else {
            return Promise.resolve({ id: cartId });
        }
    }

    handleAddProduct = () => {
        const
            { state } = this.optionsRef,
            ids = map(state, option => option.id),
            { product } = this.state,
            variant = find(product.variants,
                ({ option_value_ids }) => reduce(ids,
                    (memo, id) => memo && includes(option_value_ids, id),
                    true));

        this.getCart()
                .then(data => this.context.executeAction('cart/addProduct', {
                    id: data.id,
                    product,
                    variant_id: variant && variant.id
                }))
                .then(() => this.setState({ showProceedToCheckoutLink: true }));
    };

    hasRecommendedProducts(product) {
        return product && !isUndefined(product.recommendedProducts);
    }

    loadProduct(slug) {
        this.context.executeAction('products/getBySlug', { slug });
    }

    renderRecommendedProducts(product) {
        return <RecommendedProducts products={product.recommendedProducts} />;
    }

    render() {
        const { product } = this.state;

        if (!product) {
            return null;
        }

        return (
            <div>
                <Row className={s.root}>
                    <Column
                        className={s.leftColumn}
                        hasRightMargin
                        alignItems='stretch'
                        flowDirection='bottom'
                    >
                        <ImageViewer className={s.viewer} images={product.images} />
                    </Column>
                    <Column
                        className={s.info}
                        alignItems='stretch'
                        flowDirection='bottom'
                        hasLeftMargin
                    >
                        <ProductInfo product={product} />
                        <Separator color={COLOR_BLACK} className={s.margin} />
                        <ProductDescription text={product.description} />
                        <Separator color={COLOR_BLACK} className={s.margin} />
                        <Options
                            options={product.options}
                            onCreate={ref => this.optionsRef = ref}
                        />
                        <Button onClick={this.handleAddProduct}>Add to cart</Button>
                        {this.state.showProceedToCheckoutLink && (
                            <Link
                                custom
                                className={s.proceedToCheckout}
                                to={routes.CHECKOUT}
                            >
                                Proceed to checkout
                                &nbsp;
                                <IconTriangleRight size={SIZE_EXTRA_SMALL} />
                            </Link>
                        )}
                    </Column>
                </Row>
                {this.renderRecommendedProducts(product)}
            </div>
        );
    }
}

export default Product;
