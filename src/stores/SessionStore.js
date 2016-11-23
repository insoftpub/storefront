import Store from './Store';
import actionTypes from '../constants/actionTypes';

class SessionStore extends Store {
    static storeName = 'session';

    static handlers = {
        [actionTypes.SESSION_SAVE]: 'handleSaveSession',
        [actionTypes.SESSION_RESTORE]: 'handleRestoreSession'
    };

    getState() {
        return {};
    }

    handleSaveSession() {
        this.emit('change');
    }

    handleRestoreSession() {
        this.emit('change');
    }

    dehydrate() {
        return {};
    }
}

export default SessionStore;
