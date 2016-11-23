import mixin from '../mixin';
import WatchStoresMixin from '../../components/mixins/WatchStoresMixin';

const watchStores =
    (...storesName) => target =>
        mixin(target.prototype, WatchStoresMixin(...storesName));

export default watchStores;
