import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ShowMore.scss';
import { SIZE_EXTRA_SMALL } from '../../../../constants/icon';
import { COLOR_WHITE } from '../../../../constants/colors';
import AngleDown from '../Icon/Icons/Controls/AngleDown.jsx';
import Button from '../Button';
import { pagination } from '../../../../config';

@withStyles(s)
class ShowMore extends Component {
    static contextTypes = {
        insertPaginationInfo: pt.func.isRequired
    };

    static propTypes = {
        loading: pt.bool,
        onClick: pt.func,
        page: pt.number.isRequired,
        total: pt.number.isRequired
    };

    static defaultProps = {
        loading: false,
        page: 1
    };

    componentWillMount() {
        const
            { page, total } = this.props,
            lastPage = total / pagination.PAGE_SIZE;

        this.context.insertPaginationInfo(page, lastPage);
    }

    componentWillReceiveProps() {
        this.context.insertPaginationInfo(this.props.page);
    }

    handleButtonClick = () => {
        this.props.onClick && this.props.onClick();
    };

    renderLoader() {
        return <div className={s.loader}></div>;
    }

    renderButton() {
        const
            { page, total } = this.props,
            productsShown = page * pagination.PAGE_SIZE,
            showButton = productsShown < total;

        if (!showButton) {
            return null;
        }

        return (
            <Button
                color={COLOR_WHITE}
                icon={<AngleDown size={SIZE_EXTRA_SMALL} />}
                onClick={this.handleButtonClick}
            >
                Show more
            </Button>
        );
    }

    render() {
        const
            { page, total } = this.props,
            productsShown = page * pagination.PAGE_SIZE;

        if (total === 0) {
            return null;
        }

        return (
            <div className={s.root}>
                <div className={s.countLabel}>
                    {productsShown < total ? productsShown : total} out of {total} products are shown
                </div>
                {this.props.loading ? this.renderLoader() : this.renderButton()}
            </div>
        );
    }
}

export default ShowMore;
