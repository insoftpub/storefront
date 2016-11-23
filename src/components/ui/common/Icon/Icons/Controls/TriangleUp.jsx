import React, { Component } from 'react';
import Icon from '../../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 490,
    height: 490
};

class TriangleUp extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <path d='M490,474.459H0L245.009,15.541L490,474.459z' />
            </Icon>);
    }
}

export default TriangleUp;
