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
import Icon from '../../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 64,
    height: 64
};

class AngleDown extends Component {
    render() {
        return (
            <Icon {...this.props} viewBox={viewBox}>
                <path d='m60.533,15.733l-28.56,28.328-28.579-28.348c-0.397-0.394-0.917-0.59-1.437-0.59s-1.039,0.196-1.436,0.59c-0.793,0.787-0.793,2.062
                    0,2.849l29.98,29.735c0.2,0.2 0.494,0.375 0.757,0.476 0.75,0.282 1.597,0.107 2.166-0.456l29.981-29.735c0.793-0.787
                    0.793-2.062 0-2.849-0.794-0.786-2.078-0.786-2.872,7.10543e-15z'
                />
            </Icon>);
    }
}

export default AngleDown;
