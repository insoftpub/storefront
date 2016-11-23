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
