import React, { Component } from 'react';
import Icon from '../Icon';
import { THICKNESS_NORMAL } from '../../../../../constants/icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 200,
    height: 200
};

class Square extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <g strokeWidth={15}>
                    <line x1='0' y1='0' x2='200' y2='0'/>
                    <line x1='200' y1='0' x2='200' y2='200'/>
                    <line x1='200' y1='200' x2='0' y2='200'/>
                    <line x1='0' y1='200' x2='0' y2='0'/>
                </g>
            </Icon>
        );
    }
}

export default Square;
