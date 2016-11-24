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
    width: 400.73,
    height: 400.73
};

class Weight extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <path d='M123.349,182.517H12.5c-6.903,0-12.5,5.597-12.5,12.5c0,37.454,30.471,67.925,67.925,67.925s67.925-30.472,67.925-67.925
                    C135.849,188.114,130.253,182.517,123.349,182.517z M67.925,237.942c-19.323,0-35.705-12.833-41.069-30.425h82.138
                    C103.63,225.109,87.248,237.942,67.925,237.942z'
                />
                <path d='M388.23,182.517H277.38c-6.902,0-12.5,5.597-12.5,12.5c0,37.454,30.472,67.925,67.926,67.925
                    c37.453,0,67.925-30.472,67.925-67.925C400.73,188.114,395.134,182.517,388.23,182.517z M332.806,237.942
                    c-19.323,0-35.705-12.833-41.069-30.425h82.138C368.512,225.109,352.129,237.942,332.806,237.942z'
                />
                <path d='M241.613,336.753h-28.748V92.049c11.115-1.328,23.868-4.048,37.157-6.889c15.352-3.281,31.226-6.674,44.558-7.855
                    c16.866-1.494,22.352,1.309,23.926,2.583c0.427,0.345,1.308,1.063,1.643,3.427l-23.747,79.113
                    c-1.985,6.612,1.767,13.581,8.378,15.566c6.612,1.982,13.582-1.767,15.566-8.379l12.437-41.432l12.438,41.432
                    c1.625,5.414,6.591,8.909,11.967,8.909c1.189,0,2.399-0.171,3.599-0.53c6.612-1.985,10.363-8.954,8.378-15.566l-23.991-79.927
                    c-0.803-11.458-6.281-18.28-10.942-22.051c-18.438-14.912-52.921-7.542-89.433,0.263c-11.521,2.463-22.606,4.828-31.932,6.135
                    v-15.37c0-6.903-5.598-12.5-12.5-12.5c-6.903,0-12.5,5.597-12.5,12.5v15.37c-9.324-1.307-20.41-3.672-31.932-6.135
                    c-36.51-7.805-70.996-15.173-89.432-0.263c-4.661,3.771-10.14,10.593-10.943,22.051l-23.991,79.927
                    c-1.985,6.612,1.767,13.581,8.378,15.566c6.612,1.982,13.581-1.767,15.566-8.379l12.437-41.432l12.437,41.432
                    c1.625,5.414,6.591,8.909,11.967,8.909c1.19,0,2.4-0.171,3.599-0.53c6.612-1.985,10.363-8.954,8.378-15.566L80.582,83.315
                    c0.334-2.363,1.216-3.082,1.642-3.427c1.576-1.274,7.061-4.077,23.926-2.583c13.332,1.182,29.207,4.574,44.558,7.855
                    c13.289,2.841,26.042,5.561,37.157,6.889v244.705h-28.748c-6.904,0-12.5,5.597-12.5,12.499c0,6.903,5.596,12.5,12.5,12.5h82.496
                    c6.904,0,12.5-5.597,12.5-12.5C254.113,342.35,248.518,336.753,241.613,336.753z'
                />
            </Icon>
        );
    }
}

export default Weight;
