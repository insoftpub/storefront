import React, { Component } from 'react';
import Icon from '../Icon';
import { COLOR_BLACK } from '../../../../../constants/colors';

const viewBox = {
    x: 0,
    y: 0,
    width: 41,
    height: 41
};

class Minus extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <polyline
                    points='5,21 36,21'
                    style={{
                        fill: 'none',
                        stroke: COLOR_BLACK,
                        strokeWidth: '1'
                    }}
                />
            </Icon>);
    }
}

export default Minus;
