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
