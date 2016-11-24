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

class AngleRight extends Component {
    render() {
        return (
            <Icon {...this.props} viewBox={viewBox}>
                <path d='M44.152,32.024L15.824,60.353c-0.787,0.787-0.787,2.062,0,2.849c0.394,0.394,0.909,0.59,1.424,0.59
                    c0.515,0,1.031-0.196,1.424-0.59l29.736-29.736c0.557-0.557,0.718-1.439,0.445-2.177c-0.101-0.272-0.26-0.519-0.464-0.725
                    L18.652,0.828c-0.787-0.787-2.062-0.787-2.848,0c-0.787,0.787-0.787,2.061,0,2.848L44.152,32.024z'
                />
            </Icon>);
    }
}

export default AngleRight;
