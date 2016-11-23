import React, { Component } from 'react';
import Icon from '../../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 33,
    height: 33
};

class Close extends Component {
    render() {
        return (<Icon {...this.props} viewBox={viewBox}>
            <polygon
                points='31.112,1.414 29.698,0 15.556,14.142 1.414,0 0,1.414 14.142,15.556 0,29.698 1.414,31.112 15.556,16.97   29.698,31.112 31.112,29.698 16.97,15.556'
            />
        </Icon>);
    }
}
export default Close;
