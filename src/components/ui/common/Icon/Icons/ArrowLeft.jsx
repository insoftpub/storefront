import React, { Component } from 'react';
import Icon from '../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 476.213,
    height: 476.213
};

class ArrowLeft extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <polygon points='476.213,223.106 57.426,223.106 91.819,188.713 70.606,167.5 0,238.106 70.606,308.713 91.819,287.5 
                    57.426,253.106 476.213,253.106' />
            </Icon>);
    }
}

export default ArrowLeft;
