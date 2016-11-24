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

import React from 'react';
import { isEmpty } from 'lodash';
import Button from '../../Button';
import Link from '../../Link';
import { routes } from '../../../../../config';

export default (component, s) => {
    const { errors } = component.state;

    return [{
        name: 'email',
        type: 'email',
        title: 'E-mail',
        validators: {
            required: true
        }
    }, {
        name: 'password',
        type: 'password',
        title: 'Password',
        validators: {
            required: true
        }
    }, {
        name: 'errorMessage',
        type: 'error',
        errors,
        noMargin: isEmpty(errors)
    }, {
        name: 'forgottenLink',
        type: 'component',
        component: (
            <Link
                underlined
                className={s.regLink}
                to={routes.FORGOTTEN_PASSWORD}
                name='Forgot your password?'
            />
        )
    }, {
        name: 'login',
        type: 'component',
        component: (
            <Button isSubmit wide>
                Sign in
            </Button>
        )
    }, {
        name: 'register',
        type: 'component',
        component: (
            <Button
                wide
                to={routes.REGISTER}
            >
                Sign up
            </Button>
        )
    }];
};
