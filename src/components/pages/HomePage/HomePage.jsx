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

import React, { Component, PropTypes } from 'react';
import Container from '../../ui/common/Container';
import Image from '../../ui/common/Image';
import Row from '../../ui/common/Row';
import Column from '../../ui/common/Column';
import Link from '../../ui/common/Link';

const title = 'Home';

class HomePage extends Component {
    static pageName = 'home';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Column hasRightMargin>
                        <Link to='/product/toga-lofery-iz-gladkoj-kozhi-432'>
                            <Image src='/images/homebanner1.png' />
                        </Link>
                    </Column>
                    <Column hasRightMargin>
                        <Link to='/products/novinki'>
                            <Image src='/images/homebanner2.png' />
                        </Link>
                    </Column>
                    <Column>
                        <Link to='/product/toga-oksfordy-431'>
                            <Image src='/images/homebanner3.png' />
                        </Link>
                    </Column>
                </Row>
            </Container>
        );
    }
}

export default HomePage;
