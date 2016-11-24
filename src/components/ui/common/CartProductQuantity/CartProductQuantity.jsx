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
import cx from 'classnames';
import s from './CartProductQuantity.scss';
import IconAngleLeft from '../Icon/Icons/Controls/LeftAngle.jsx';
import IconAngleRight from '../Icon/Icons/Controls/RightAngle.jsx';
import { SIZE_TINY as ICON_SIZE, THICKNESS_THICK as ICON_THICKNESS } from '../../../../constants/icon';

const DECREASE_TIMEOUT = 1000;

@withStyles(s)
class CartProductQuantity extends Component {
    static contextTypes = {
        executeAction: pt.func.isRequired
    };

    static propTypes = {
        quantity: pt.number,
        maxQuantity: pt.number,
        cartActionParams: pt.object,
        className: pt.string
    };

    static defaultProps = {
        maxQuantity: 9999999,
        cartActionParams: {}
    };

    state = {
        quantity: this.props.quantity
    };

    componentWillReceiveProps(nextProps) {
        nextProps.quantity && this.setState({
            quantity: nextProps.quantity
        });
    }

    handleIncreaseCount = () => {
        window.clearTimeout(this.action.timeout);
        this.action.counter++;
        this.action.timeout = setTimeout(() => {
            this.context.executeAction('cart/changeProductCount', {
                ...this.props.cartActionParams,
                quantity: this.action.counter
            });
            this.action.counter = 0;
        }, DECREASE_TIMEOUT);
        this.setState({
            quantity: this.state.quantity + 1
        });
    };

    handleDecreaseCount = () => {
        window.clearTimeout(this.action.timeout);
        this.action.counter--;
        this.action.timeout = setTimeout(() => {
            this.context.executeAction('cart/changeProductCount', {
                ...this.props.cartActionParams,
                quantity: this.action.counter
            });
            this.action.counter = 0;
        }, DECREASE_TIMEOUT);
        this.setState({
            quantity: this.state.quantity - 1
        });
    };

    action = {
        timeout: {},
        counter: 0
    };

    render() {
        const isAvailable = this.props.maxQuantity !== 0;

        return (
            <div className={cx(s.root, this.props.className)}>
                <div className={s.controls}>
                    {isAvailable && <IconAngleLeft
                        size={ICON_SIZE}
                        thickness={ICON_THICKNESS}
                        className={s.control}
                        disabled={this.state.quantity === 1}
                        onClick={this.handleDecreaseCount}
                    />}
                    <div className={s.quantity}>{this.state.quantity} pcs.</div>
                    {isAvailable && <IconAngleRight
                        size={ICON_SIZE}
                        thickness={ICON_THICKNESS}
                        className={s.control}
                        disabled={this.state.quantity >= this.props.maxQuantity}
                        onClick={this.handleIncreaseCount}
                    />}
                </div>
                {isAvailable
                    ? <div className={s.inStock}>in&nbsp;stock</div>
                    : <div className={s.outStock}>not&nbsp;in&nbsp;stock</div>}
            </div>
        );
    }
}

export default CartProductQuantity;
