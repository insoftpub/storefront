import React, { Component } from 'react';
import Icon from '../../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 384,
    height: 384
};

class TriangleRight extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <path d='M32,0l320,192L32,384V0z' />
            </Icon>);
    }
}

export default TriangleRight;
