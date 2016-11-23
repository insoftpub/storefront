import React, { Component } from 'react';
import Icon from '../../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 155.139,
    height: 155.139
};

class Facebook extends Component {
    render() {
        return (
            <Icon {...this.props} viewBox={viewBox}>
                <path
                    d='M89.584,155.139V84.378h23.742l3.562-27.585H89.584V39.184
                    c0-7.984,2.208-13.425,13.67-13.425l14.595-0.006V1.08C115.325,0.752,106.661,0,96.577,0C75.52,0,61.104,12.853,61.104,36.452
                    v20.341H37.29v27.585h23.814v70.761H89.584z'
                />
            </Icon>
        );
    }
}

export default Facebook;
