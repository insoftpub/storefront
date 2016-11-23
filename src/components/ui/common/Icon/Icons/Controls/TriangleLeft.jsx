import React, { Component } from 'react';
import Icon from '../../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 46.001,
    height: 46.001
};

class TriangleRight extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <polygon
                    points='42.998,0 43,46.001 3,22.997'
                />
            </Icon>);
    }
}

export default TriangleRight;
