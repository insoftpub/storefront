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

class Instagram extends Component {
    render() {
        return (
            <Icon {...this.props} viewBox={viewBox}>
                <path d='M58,0H6C2.691,0,0,2.691,0,6v52c0,3.309,2.691,6,6,6h52c3.309,0,6-2.691,6-6V6C64,2.691,61.309,0,58,0z
                 M43.75,9.785c0-2.199,1.8-4,4-4h4.999c2.2,0,4,1.801,4,4v6.057c0,2.199-1.8,4-4,4H47.75c-2.2,0-4-1.801-4-4V9.785z M32,17.891
                 c7.78,0,14.109,6.33,14.109,14.109S39.78,46.109,32,46.109S17.891,39.779,17.891,32S24.22,17.891,32,17.891z M58,60H6
                 c-1.103,0-2-0.896-2-2V27.141h2h6.64h1.944c-0.435,1.551-0.693,3.174-0.693,4.859c0,9.986,8.124,18.109,18.109,18.109
                 S50.109,41.986,50.109,32c0-1.686-0.259-3.309-0.693-4.859h1.944H58h2V58C60,59.104,59.103,60,58,60z'
                />
            </Icon>);
    }
}

export default Instagram;
