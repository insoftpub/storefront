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

import Store from './Store';
import actionTypes from '../constants/actionTypes';
import { parseUser } from './parsers/user';

class UserStore extends Store {
    static storeName = 'user';

    static handlers = {
        [actionTypes.USER_REGISTER]: "handleUserRegister",
        [actionTypes.USER_LOGOUT]: "handleUserLogout",
        [actionTypes.USER_LOGIN]: "handleUserLogin",
        [actionTypes.USER_GET]: "handleUserGet"
    };

    initialize() {
        this.userInfo = parseUser();
        this.isLogged = false;
    }

    getState() {
        return {
            userInfo: this.userInfo,
            isLogged: this.isLogged
        };
    }

    updateUserInfo(data) {
        this.isLogged = true;
        this.userInfo = parseUser(data);

        this.emit('change');
    }

    handleUserRegister(data) {
        this.isLogged = true;
        this.userInfo = parseUser(data);

        this.emit('change');
    }

    handleUserLogout() {
        this.isLogged = false;
        this.userInfo = parseUser();

        this.emit('change');
    }

    handleUserGet(data) { this.updateUserInfo(data); }

    handleUserLogin(data) { this.updateUserInfo(data); }

    dehydrate() {
        return {
            userInfo: this.userInfo,
            isLogged: this.isLogged
        };
    }
}

export default UserStore;
