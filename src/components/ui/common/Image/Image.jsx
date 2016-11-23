import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { noop } from 'lodash';
import s from './Image.scss';
import cx from 'classnames';

@withStyles(s)
class Image extends Component {
    static propTypes = {
        className: pt.string,
        onLoad: pt.func,
        onClick: pt.func,
        onLoading: pt.func,
        src: pt.string.isRequired
    };

    static defaultProps = {
        onLoad: noop,
        onClick: noop,
        onLoading: noop
    };

    componentDidMount() {
        this.img.complete
            ? this.props.onLoad()
            : this.props.onLoading();
    }

    render() {
        const { src, className, onLoad, onClick } = this.props;

        return (
            <img
                ref={ref => this.img = ref}
                src={src}
                className={cx(s.root, className)}
                onClick={onClick}
                onLoad={onLoad}
                onError={onLoad}
            />
        );
    }
}

export default Image;
