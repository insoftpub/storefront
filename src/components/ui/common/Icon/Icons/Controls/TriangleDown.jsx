import React, { Component } from 'react';
import Icon from '../../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 490,
    height: 490
};

class TriangleDown extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <path d='M0,15.541h490L244.991,474.459L0,15.541z' />
            </Icon>);
    }
}

export default TriangleDown;
