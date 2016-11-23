import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CheckoutSuccess.scss';
import Button from '../Button';
import { COLOR_WHITE } from '../../../../constants/colors';
import { routes } from '../../../../config';

function CheckoutSuccess() {
    return (
        <div className={s.root}>
            <article className={s.text}>
                <header className={s.header}>Thank you for your purchase!</header>
                <div>
                    Your order is accepted.
                    <br />
                    We'll call you to clarify the delivery time.
                </div>
            </article>
            <Button
                link
                color={COLOR_WHITE}
                to={routes.HOME}
            >
                Back to shopping
            </Button>
        </div>
    );
}

export default withStyles(s)(CheckoutSuccess);
