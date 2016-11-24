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
import Price from '../Price';
import s from './ProductPreview.scss';
import cx from 'classnames';
import Image from '../Image';
import { head } from 'lodash';

@withStyles(s)
class ProductPreview extends Component {
    static contextTypes = {
        executeAction: pt.func.isRequired
    };

    static propTypes = {
        product: pt.object,
        onClick: pt.func
    };

    static defaultProps = {
        product: {}
    };

    handleProductClick = () => {
        this.props.onClick && this.props.onClick(this.props.product.slug);
        this.context.executeAction('navigate/to', { url: `/product/${this.props.product.slug}` });
    };

    render() {
        const
            { product } = this.props,
            frontImage = head(product.images);

        return (
            <div className={s.root} id={`product-${product.slug}`}>
                <div onClick={this.handleProductClick}>
                    <Image src={frontImage && frontImage.url} />
                </div>
                <header className={s.info}>
                    <div
                        onClick={this.handleProductClick}
                        className={s.brand}
                    >
                        {product.manufacturer_name}
                    </div>
                    <div
                        onClick={this.handleProductClick}
                        className={s.title}
                    >
                        {product.name}
                    </div>
                    <Price
                        className={cx(s.smartAlign, s.price)}
                        amount={product.price}
                        discountPercentage={product.discount}
                        currency={product.currency}
                    />
                </header>
            </div>
        );
    }
}

export default ProductPreview;
