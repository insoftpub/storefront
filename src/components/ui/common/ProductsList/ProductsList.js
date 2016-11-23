import React, { Component, PropTypes as pt } from 'react';
import ProductPreview from '../ProductPreview';
import watchStores from '../../../../utils/decorators/watchStores';
import ShowMore from '../ShowMore';
import { isEmpty, isEqual, chain } from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductsList.scss';
import mixin from '../../../../utils/decorators/mixinComponent';
import ScrollToMixin from '../../../mixins/ScrollToMixin';

@withStyles(s)
@mixin(ScrollToMixin)
@watchStores(
    'products'
)
class ProductList extends Component {
    static contextTypes = {
        getStore: pt.func.isRequired,
        executeAction: pt.func.isRequired
    };

    static propTypes = {
        hasPagination: pt.bool,
        products: pt.array,
        onNextPage: pt.func,
        total: pt.number,
        currentPage: pt.number,
        loading: pt.bool,
        nextPageLoading: pt.bool
    };

    static defaultProps = {
        products: [],
        hasPagination: false,
        nextPageLoading: false,
        loading: false
    };

    constructor(props) {
        super(props);

        this.state = {
            nextPageLoading: false
        };

        this.isDirty = !isEmpty(props.products);
    }

    componentDidMount() {
        const { activeProduct } = this.state;

        // Scroll to last viewed product
        if (activeProduct !== null) {
            this.context.executeAction('products/unsetActiveProduct')
                .then(() => {
                    this.scrollTo({
                        hash: `#product-${activeProduct}`,
                        animate: false
                    });
                });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.products, nextProps.products)) {
            this.setState({ nextPageLoading: false });
        }

        if (this.isDirty) {
            return;
        }

        if (nextProps.loading === false) {
            this.isDirty = true;
        }
    }

    getStoresState() {
        const { activeProduct } = this.context.getStore('products').getState();

        return { activeProduct };
    }

    handleProductClick = slug => {
        this.context.executeAction('products/setActiveProduct', { slug });
    };

    handleShowMoreClick = () => {
        if (this.props.onNextPage) {
            this.props.onNextPage(this.props.currentPage + 1);
            this.setState({ nextPageLoading: true });
        }
    };

    renderProducts() {
        const { products } = this.props;

        if (isEmpty(products) && this.isDirty) {
            return <p>Products of this category were not found.</p>;
        }

        return (
            <div className={s.list}>
                {chain(products)
                    .sortBy(product => +(product.name.split('#')[1]))
                    .map(product => (
                        <ProductPreview
                            onClick={this.handleProductClick}
                            key={product.id}
                            product={product}
                        />
                    ))
                    .value()}
            </div>
        );
    }

    renderShowMore() {
        return (
            <ShowMore
                loading={this.state.nextPageLoading}
                page={this.props.currentPage}
                total={this.props.total}
                onClick={this.handleShowMoreClick}
            />
        );
    }

    render() {
        return (
            <div className={s.root}>
                {this.renderProducts()}
                {this.props.hasPagination && this.renderShowMore()}
            </div>
        );
    }
}

export default ProductList;
