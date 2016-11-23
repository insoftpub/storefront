import mixin from '../mixin';

const setRef = target => mixin(target.prototype, {
    componentWillMount() {
        this.setRef = this.setRef.bind(this);
    },

    setRef(ref) {
        return element => this[ref] = element;
    }
});

export default setRef;
