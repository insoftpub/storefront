import React, { Component } from 'react';
import Icon from '../Icon';
import { THICKNESS_THICK as ICON_THICKNESS } from '../../../../../constants/icon';

const viewBox = {
    x: 0,
    y: 0,
    width: 260,
    height: 260
};

class Profile extends Component {
    render() {
        return (
            <Icon
                {...this.props}
                viewBox={viewBox}
            >
                <g fill='none' strokeWidth={ICON_THICKNESS}>
                    <circle cx='129.375' cy='60' r='60' />
                    <path
                        d='M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z'
                    />
                </g>
            </Icon>);
    }
}

export default Profile;
