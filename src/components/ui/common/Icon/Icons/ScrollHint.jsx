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
    width: 600,
    height: 600
};

class ScrollHint extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <g
                    transform='translate(0.000000,600.000000) scale(0.100000,-0.100000)'
                    strokeWidth='100'
                >
                    <path
                        d='M620 5000 c0 -20 7 -20 1430 -20 1423 0 1430 0 1430 20 0 20 -7 20
                            -1430 20 -1423 0 -1430 0 -1430 -20z'
                    />
                    <path
                        d='M4537 4162 c-357 -357 -445 -450 -435 -460 10 -10 102 77 455 430
                            l443 443 443 -443 c353 -353 445 -440 455 -430 10 10 -78 103 -435 460 -246
                            247 -455 448 -463 448 -8 0 -217 -201 -463 -448z'
                    />
                    <path
                        d='M620 4000 c0 -20 7 -20 1430 -20 1423 0 1430 0 1430 20 0 20 -7 20
                            -1430 20 -1423 0 -1430 0 -1430 -20z'
                    />
                    <path
                        d='M620 3000 c0 -20 7 -20 1430 -20 1423 0 1430 0 1430 20 0 20 -7 20
                            -1430 20 -1423 0 -1430 0 -1430 -20z'
                    />
                    <path
                        d='M4106 2502 c-6 -10 877 -896 897 -900 16 -3 929 887 921 899 -3 5 -9
                            9 -14 9 -5 0 -211 -198 -457 -440 l-448 -440 -440 440 c-242 242 -443 440
                            -447 440 -4 0 -9 -4 -12 -8z'
                    />
                    <path
                        d='M620 2000 c0 -20 7 -20 1430 -20 1423 0 1430 0 1430 20 0 20 -7 20
                            -1430 20 -1423 0 -1430 0 -1430 -20z'
                    />
                    <path
                        d='M620 1000 c0 -20 7 -20 1430 -20 1423 0 1430 0 1430 20 0 20 -7 20
                            -1430 20 -1423 0 -1430 0 -1430 -20z'
                    />
                </g>
            </Icon>);
    }
}

export default ScrollHint;
