import React, { Component, PropTypes as pt } from 'react';
import Icon from '../Icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 200,
    height: 200
};

class Radio extends Component {
    static propTypes = {
        checked: pt.bool
    };

    static defaultProps = {
        checked: false
    };

    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <g stroke='black' strokeWidth='10' fill='none'>
                    <circle cx='100' cy='100' r='80' />
                    {this.props.checked && <circle cx='100' cy='100' r='60' fill='black' />}
                </g>
            </Icon>);
    }
}

export default Radio;
