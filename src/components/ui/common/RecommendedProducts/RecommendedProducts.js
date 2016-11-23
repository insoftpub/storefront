import React, { Component, PropTypes as pt } from 'react';
import ProductPreview from '../ProductPreview';
import Separator from '../Separator';
import s from './RecommendedProducts.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { isEmpty } from 'lodash';

@withStyles(s)
class RecommendedProducts extends Component {
    static propTypes = {
        products: pt.array
    };

    static defaultProps = {
        products: []
    };

    render() {
        const { products } = this.props;

        if (isEmpty(products)) {
            return null;
        }

        return (
            <div className={s.root}>
                <Separator />
                <div className={s.header}>
                    <span className={s.title}>Вам также может понравиться</span>
                </div>
                <div className={s.productList}>
                    {products.map(product =>
                        <ProductPreview
                            key={'prod' + product.id}
                            product={product}
                        />
                    )}
                </div>
                <Separator />
            </div>
        );
    }
}

export default RecommendedProducts;
