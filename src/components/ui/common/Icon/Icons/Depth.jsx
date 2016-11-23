import React, { Component } from 'react';
import Icon from '../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 268.832,
    height: 268.832
};

class Depth extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <path d='M223.255,167.493c-4.881-4.882-12.797-4.882-17.678,0l-58.661,58.661V12.5c0-6.903-5.598-12.5-12.5-12.5
                    c-6.904,0-12.5,5.597-12.5,12.5v213.654l-58.661-58.659c-4.883-4.881-12.797-4.881-17.678,0c-4.883,4.882-4.883,12.796,0,17.678
                    l80,79.998c2.439,2.44,5.64,3.661,8.839,3.661s6.397-1.221,8.839-3.661l80-80C228.137,180.289,228.137,172.375,223.255,167.493z'
                />
            </Icon>);
    }
}

export default Depth;
