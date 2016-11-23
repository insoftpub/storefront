import mixin from 'smart-mixin';

export default mixin({
    // React components
    componentDidMount: mixin.MANY,
    componentWillMount: mixin.MANY,
    componentWillReceiveProps: mixin.MANY,
    shouldComponentUpdate: mixin.ONCE,
    componentWillUpdate: mixin.MANY,
    componentDidUpdate: mixin.MANY,
    componentWillUnmount: mixin.MANY,
});
