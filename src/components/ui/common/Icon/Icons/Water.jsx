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

import React, { Component } from 'react';
import Icon from '../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 304.223,
    height: 304.223
};

class Water extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <path
                    d='M152.112,0C68.241,0,0.008,68.244,0.008,152.109c0,83.87,68.233,152.114,152.103,152.114
                    c83.865,0,152.103-68.244,152.103-152.114C304.215,68.244,235.982,0,152.112,0z M152.112,275.984
                    c-68.32,0-123.891-55.565-123.891-123.875c0-68.326,55.571-123.886,123.891-123.886s123.891,55.565,123.891,123.886
                    C276.003,220.418,220.432,275.984,152.112,275.984z'
                />
                <path
                    d='M207.236,170.384c0,30.448-24.682,55.125-55.125,55.125s-55.125-24.677-55.125-55.125
                    s55.125-80.553,55.125-80.553S207.236,139.942,207.236,170.384z'
                />
            </Icon>);
    }
}

export default Water;
