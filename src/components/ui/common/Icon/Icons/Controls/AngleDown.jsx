import React, { Component } from 'react';
import Icon from '../../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 64,
    height: 64
};

class AngleDown extends Component {
    render() {
        return (
            <Icon {...this.props} viewBox={viewBox}>
                <path d='m60.533,15.733l-28.56,28.328-28.579-28.348c-0.397-0.394-0.917-0.59-1.437-0.59s-1.039,0.196-1.436,0.59c-0.793,0.787-0.793,2.062
                    0,2.849l29.98,29.735c0.2,0.2 0.494,0.375 0.757,0.476 0.75,0.282 1.597,0.107 2.166-0.456l29.981-29.735c0.793-0.787
                    0.793-2.062 0-2.849-0.794-0.786-2.078-0.786-2.872,7.10543e-15z'
                />
            </Icon>);
    }
}

export default AngleDown;
