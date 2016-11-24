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

class AngleLeft extends Component {
    render() {
        return (
            <Icon {...this.props} viewBox={viewBox}>
                <path d='m45.539,63.41c0.394,0.394 0.908,0.59 1.424,0.59s1.031-0.197 1.424-0.59c0.787-0.787 0.787-2.061
                    0-2.848l-28.328-28.329 28.348-28.347c0.786-0.787 0.786-2.062
                    0-2.848-0.787-0.787-2.062-0.787-2.849,0l-29.736,29.735c-0.205,0.206-0.384,0.506-0.484,0.778-0.273,0.738-0.092,1.567
                    0.465,2.124l29.736,29.735z'
                />
            </Icon>);
    }
}

export default AngleLeft;
