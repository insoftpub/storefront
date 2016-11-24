/**
 * MIT License
 *
 * Copyright (c) 2016 InSoft Engineering / github.com/insoftpub
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react';
import IconAngleLeft from './Icons/Controls/LeftAngle.jsx';
import IconAngleUp from './Icons/Controls/AngleUp.jsx';
import IconAngleRight from './Icons/Controls/RightAngle.jsx';
import IconAngleDown from './Icons/Controls/AngleDown.jsx';
import IconClose from './Icons/Controls/Close.jsx';
import IconMenu from './Icons/Controls/Menu.jsx';
import IconCart from './Icons/Cart.jsx';
import IconSearch from './Icons/Search.jsx';
import IconDepth from './Icons/Depth.jsx';
import IconWidth from './Icons/Width.jsx';
import IconHeight from './Icons/Height.jsx';
import IconWater from './Icons/Water.jsx';
import IconTriangleRight from './Icons/Controls/TriangleRight.jsx';
import IconTriangleLeft from './Icons/Controls/TriangleLeft.jsx';
import IconSelected from './Icons/Selected.jsx';
import IconWeight from './Icons/Weight.jsx';
import IconScrollHint from './Icons/ScrollHint.jsx';
import IconFacebook from './Icons/SocialNetworks/Facebook.jsx';
import IconTwitter from './Icons/SocialNetworks/Twitter.jsx';
import IconGooglePlus from './Icons/SocialNetworks/GooglePlus.jsx';
import IconPinterest from './Icons/SocialNetworks/Pinterest.jsx';
import IconVK from './Icons/SocialNetworks/VK.jsx';
import IconInstagram from './Icons/SocialNetworks/Instagram.jsx';
import IconHanger from './Icons/Hanger.jsx';
import IconTriangleUp from './Icons/Controls/TriangleUp.jsx';
import IconTriangleDown from './Icons/Controls/TriangleDown.jsx';
import IconApproved from './Icons/Approved.jsx';
import IconProfile from './Icons/Profile.jsx';
import IconHome from './Icons/Home.jsx';
import IconEdit from './Icons/Edit.jsx';
import IconEnvelope from './Icons/Envelope.jsx';
import IconSquare from './Icons/Square.jsx';
import IconChecked from './Icons/Checked.jsx';
import IconRadio from './Icons/Radio.jsx';
import IconArrowLeft from './Icons/ArrowLeft.jsx';
import IconPhone from './Icons/Phone.jsx';
import IconTrashcan from './Icons/Trashcan.jsx';
import IconPlus from './Icons/Plus.jsx';
import IconMinus from './Icons/Minus.jsx';

function iconsMap(size) {
    return [
        {
            title: 'Minus',
            value: <IconMinus size={size} />
        }, {
            title: 'Plus',
            value: <IconPlus size={size} />
        }, {
            title: 'Trashcan',
            value: <IconTrashcan size={size} />
        }, {
            title: 'Phone',
            value: <IconPhone size={size} />
        }, {
            title: 'ArrowLeft',
            value: <IconArrowLeft size={size} />
        }, {
            title: 'Radio (props.checked = true)',
            value: <IconRadio size={size} checked />
        }, {
            title: 'Radio (props.checked = false',
            value: <IconRadio size={size} />
        }, {
            title: 'Checked',
            value: <IconChecked size={size} />
        }, {
            title: 'Square',
            value: <IconSquare size={size} />
        }, {
            title: 'Envelope',
            value: <IconEnvelope size={size} />
        }, {
            title: 'Edit',
            value: <IconEdit size={size} />
        }, {
            title: 'Home',
            value: <IconHome size={size} />
        }, {
            title: 'Profile',
            value: <IconProfile size={size} />
        }, {
            title: 'Approved',
            value: <IconApproved size={size} />
        }, {
            title: 'Hanger',
            value: <IconHanger size={size} />
        }, {
            title: 'SocialNetworks/ Instagram',
            value: <IconInstagram size={size} />
        }, {
            title: 'SocialNetworks/ VK',
            value: <IconVK size={size} />
        }, {
            title: 'SocialNetworks/ Pinterest',
            value: <IconPinterest size={size} />
        }, {
            title: 'SocialNetworks/ GooglePlus',
            value: <IconGooglePlus size={size} />
        }, {
            title: 'SocialNetworks/ Twitter',
            value: <IconTwitter size={size} />
        }, {
            title: 'SocialNetworks/ Facebook',
            value: <IconFacebook size={size} />
        }, {
            title: 'ScrollHint',
            value: <IconScrollHint size={size} />
        }, {
            title: 'Selected',
            value: <IconSelected size={size} />
        }, {
            title: 'Controls/ AngleLeft',
            value: <IconAngleLeft size={size} />
        }, {
            title: 'Controls/ AngleUp',
            value: <IconAngleUp size={size} />
        }, {
            title: 'Controls/ AngleRight',
            value: <IconAngleRight size={size} />
        }, {
            title: 'Controls/ AngleDown',
            value: <IconAngleDown size={size} />
        }, {
            title: 'Controls/ Close',
            value: <IconClose size={size} />
        }, {
            title: 'Controls/ Menu',
            value: <IconMenu size={size} />
        }, {
            title: 'Search',
            value: <IconSearch size={size} />
        }, {
            title: 'Cart',
            value: <IconCart size={size} />
        }, {
            title: 'Depth',
            value: <IconDepth size={size} />
        }, {
            title: 'Width',
            value: <IconWidth size={size} />
        }, {
            title: 'Height',
            value: <IconHeight size={size} />
        }, {
            title: 'Water',
            value: <IconWater size={size} />
        }, {
            title: 'Controls/ TriangleRight',
            value: <IconTriangleRight size={size} />
        }, {
            title: 'Controls/ TriangleLeft',
            value: <IconTriangleLeft size={size} />
        }, {
            title: 'Controls/ TriangleDown',
            value: <IconTriangleDown size={size} />
        }, {
            title: 'Controls/ TriangleUp',
            value: <IconTriangleUp size={size} />
        }, {
            title: 'Weight',
            value: <IconWeight size={size} />
        }
    ];
}

export default iconsMap;
