import React, { Component } from 'react';
import Icon from '../../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 64,
    height: 64
};

class AngleRight extends Component {
    render() {
        return (
            <Icon {...this.props} viewBox={viewBox}>
                <path d='M44.152,32.024L15.824,60.353c-0.787,0.787-0.787,2.062,0,2.849c0.394,0.394,0.909,0.59,1.424,0.59
                    c0.515,0,1.031-0.196,1.424-0.59l29.736-29.736c0.557-0.557,0.718-1.439,0.445-2.177c-0.101-0.272-0.26-0.519-0.464-0.725
                    L18.652,0.828c-0.787-0.787-2.062-0.787-2.848,0c-0.787,0.787-0.787,2.061,0,2.848L44.152,32.024z'
                />
            </Icon>);
    }
}

export default AngleRight;
