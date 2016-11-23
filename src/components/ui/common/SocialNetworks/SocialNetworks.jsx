import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SocialNetworks.scss';
import cx from 'classnames';
import Link from '../Link';
import IconFacebook from '../Icon/Icons/SocialNetworks/Facebook.jsx';
import IconTwitter from '../Icon/Icons/SocialNetworks/Twitter.jsx';
import IconGooglePlus from '../Icon/Icons/SocialNetworks/GooglePlus.jsx';
import IconPinterest from '../Icon/Icons/SocialNetworks/Pinterest.jsx';
import IconVK from '../Icon/Icons/SocialNetworks/VK.jsx';
import { SIZE_MEDIUM as ICON_SIZE } from '../../../../constants/icon';
import { routes, baseUrl, siteName, facebook } from '../../../../config';
import { extractText } from '../../../../utils/html';

const
    IMAGE_WIDTH = 1200,
    IMAGE_HEIGHT = 630;

@withStyles(s)
class SocialNetworks extends Component {
    static contextTypes = {
        executeAction: pt.func.isRequired,
        onSetMeta: pt.func.isRequired
    };

    static propTypes = {
        className: pt.string,
        productSlug: pt.string,
        productName: pt.string,
        productImage: pt.object,
        productDesc: pt.string
    };

    render() {
        const
            { productImage, productName, productSlug, productDesc } = this.props,
            pageUrl = baseUrl + routes.PRODUCT + '/' + productSlug;

        this.context.onSetMeta('og:url', pageUrl, 'property');
        this.context.onSetMeta('og:title', productName, 'property');
        this.context.onSetMeta('og:description', extractText(productDesc), 'property');
        this.context.onSetMeta('og:image', productImage.url, 'property');
        this.context.onSetMeta('og:type', 'product', 'property');
        this.context.onSetMeta('og:locale', 'ru_RU', 'property');
        this.context.onSetMeta('og:site_name', siteName, 'property');
        this.context.onSetMeta('og:width', IMAGE_WIDTH, 'property');
        this.context.onSetMeta('og:height', IMAGE_HEIGHT, 'property');
        this.context.onSetMeta('fb:app_id', facebook.APP_ID, 'property');

        return (
            <div className={cx(s.root, this.props.className)}>
                <Link
                    custom
                    className={s.icon}
                    to={routes.FACEBOOK_SHARE + pageUrl}
                >
                    <IconFacebook size={ICON_SIZE} />
                </Link>
                <Link
                    custom
                    className={s.icon}
                    to={routes.TWITTER_SHARE + productName + ' ' + pageUrl}
                >
                    <IconTwitter size={ICON_SIZE} />
                </Link>
                <Link
                    custom
                    className={s.icon}
                    to={routes.GOOGLE_PLUS_SHARE + pageUrl}
                >
                    <IconGooglePlus size={ICON_SIZE} />
                </Link>
                <Link
                    custom
                    className={s.icon}
                    to={routes.PINTEREST_SHARE + productImage.url + '&url=' + pageUrl}
                >
                    <IconPinterest size={ICON_SIZE} />
                </Link>
                <Link
                    custom
                    className={s.icon}
                    to={routes.VK_SHARE + pageUrl}
                >
                    <IconVK size={ICON_SIZE} />
                </Link>
            </div>
        );
    }
}

export default SocialNetworks;
