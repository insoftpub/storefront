import React, { Component, PropTypes } from 'react';
import Link from '../../ui/common/Link';
import { mail } from '../../../config';
import IconEdit from '../../ui/common/Icon/Icons/Edit.jsx';
import { SIZE_SMALL, THICKNESS_NORMAL } from '../../../constants/icon';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ErrorPage.scss';

const title = 'Error';

@withStyles(s)
class ErrorPage extends Component {
    static pageName = 'error';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.context.setTitle(title);
    }

    render() {
        return (
            <div className={s.wrapper}>
                <h1>DOWN FOR MAINTENANCE</h1>
                <p>Store is down for maintenance</p>
                <p>and will be back shortly.</p>
                <p>Please, visit us later.</p>
                <p>Thank you!</p>
                <p className={s.linksWrapper}>
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
                </p>
            </div>
        );
    }

}

export default ErrorPage;
