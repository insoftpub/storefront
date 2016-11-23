import React, { Component, PropTypes } from 'react';
import Link from '../../ui/common/Link';
import { routes, mail } from '../../../config';
import IconHome from '../../ui/common/Icon/Icons/Home.jsx';
import IconEdit from '../../ui/common/Icon/Icons/Edit.jsx';
import { SIZE_SMALL, THICKNESS_NORMAL } from '../../../constants/icon';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFoundPage.scss';

const title = 'Page Not Found';

@withStyles(s)
class NotFoundPage extends Component {
    static pageName = 'notFound';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired,
        onPageNotFound: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
        this.context.onPageNotFound();
    }

    renderLinks() {
        return [
            <Link
                to={routes.HOME}
                key={'HOME'}
                className={s.link}
                wrapperClassName={s.linkWrapper}
            >
                <span className={s.linkIconWrapper}>
                    <IconHome
                        className={s.linkIcon}
                        size={SIZE_SMALL}
                        thickness={THICKNESS_NORMAL}
                        color='#888'
                    />
                </span>
                <span>HOME</span>
            </Link>,
            <Link
                to={`mailto:${mail}`}
                key={'CONTACT US'}
                className={s.link}
                wrapperClassName={s.linkWrapper}
            >
                <span className={s.linkIconWrapper}>
                    <IconEdit
                        className={s.linkIcon}
                        size={SIZE_SMALL}
                        thickness={THICKNESS_NORMAL}
                        color='#888'
                    />
                </span>
                <span>CONTACT US</span>
            </Link>
        ];
    }

    render() {
        return (
            <div className={s.wrapper}>
                <h1>ERROR 404</h1>
                <h2>PAGE NOT FOUND</h2>
                <p>Sorry, but the page</p>
                <p>you were trying to view</p>
                <p>does not exist.</p>
                <p className={s.linksWrapper}>{this.renderLinks()}</p>
            </div>
        );
    }

}

export default NotFoundPage;
