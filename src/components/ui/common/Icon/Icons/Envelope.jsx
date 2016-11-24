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
    width: 490,
    height: 490
};

class Envelope extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <path
                    d='M479.574,78.191H10.425c-0.071,0-0.141,0.007-0.211,0.008l0.001,0.003C4.556,78.315,0,82.925,0,88.617v312.766
                    c0,5.762,4.669,10.426,10.425,10.426h469.149c5.758,0,10.426-4.664,10.426-10.426V88.617C490,82.854,485.332,78.191,479.574,78.191z
                     M454.407,99.043l-138.581,138.58c-0.002,0.002-0.004,0.003-0.006,0.005L245,308.449l-70.82-70.821
                    c-0.004-0.004-0.008-0.007-0.013-0.012L35.594,99.043H454.407z M20.851,113.784l131.215,131.215L20.851,376.215V113.784z
                     M35.594,390.957l131.215-131.216l70.821,70.821c3.629,3.629,9.303,5.439,14.743,0l70.82-70.82l131.215,131.215H35.594z
                     M469.149,376.213L337.935,244.999l131.214-131.214V376.213z'
                />
            </Icon>);
    }
}

export default Envelope;
