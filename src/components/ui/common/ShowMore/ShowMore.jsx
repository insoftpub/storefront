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
