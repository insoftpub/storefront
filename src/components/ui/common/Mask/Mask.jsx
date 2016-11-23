import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Mask.scss';
import cx from 'classnames';
import { COLOR_BLACK as DEFAULT_COLOR } from '../../../../constants/colors';

@withStyles(s)
class Mask extends Component {
    static propTypes = {
        color: pt.string,
        fullPage: pt.bool,
        visible: pt.bool,
        opacity: pt.oneOfType([
            pt.number,
            pt.string
        ]),
        className: pt.string
    };

    static defaultProps = {
        fullPage: true,
        color: DEFAULT_COLOR
    };

    render() {
        const { className, visible, opacity, fullPage, color, ...props } = this.props;

        return (
            <div
                {...props}
                className={cx(
                    s.root,
                    className, {
                        [s.visible]: visible,
                        [s.fullPage]: fullPage
                    }
                )}
                style={{
                    opacity: visible ? opacity : 0,
                    backgroundColor: color
                }}
            >
            </div>
        );
    }
}

export default Mask;
