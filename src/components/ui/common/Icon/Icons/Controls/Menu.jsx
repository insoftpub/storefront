import React, { Component, PropTypes } from 'react';
import Icon from '../../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 50,
    height: 50
};

class Menu extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <g strokeWidth='2'>
                    <path d='M0 6 50 6' />
                    <path d='M0 25 50 25' />
                    <path d='M0 44 50 44' />
                </g>
            </Icon>
        );
    }
}

export default Menu;
