import mixin from '../mixin';

export default mixins => target => mixin(target.prototype, mixins);
