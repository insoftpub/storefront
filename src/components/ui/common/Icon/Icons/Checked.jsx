import React, { Component } from 'react';
import Icon from '../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 406.834,
    height: 406.834
};

class Checked extends Component {
    render() {
        return (
            <Icon {...this.props} viewBox={viewBox}>
                <polygon
                    points='385.621,62.507 146.225,301.901 21.213,176.891 0,198.104 146.225,344.327 406.834,83.72'
                />
            </Icon>);
    }
}
export default Checked;
