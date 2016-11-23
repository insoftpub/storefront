import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Section.scss';
import cx from 'classnames';
import Separator from '../Separator';
import Title from '../Title';

@withStyles(s)
class Section extends Component {
    static propTypes = {
        flexible: pt.bool,
        hasBottomMargin: pt.bool,
        hasSeparator: pt.bool,
        centered: pt.bool,
        title: pt.string,
        className: pt.string,
        onClick: pt.func
    };

    static defaultProps = {
        flexible: false,
        hasBottomMargin: true,
        hasBottomPadding: false,
        hasSeparator: false,
        centered: false
    };

    render() {
        return (
            <div
                onClick={this.props.onClick}
                className={cx(s.root, this.props.className, {
                    [s.flexible]: this.props.flexible,
                    [s.bottomMargin]: this.props.hasBottomMargin,
                    [s.centered]: this.props.centered
                })}
            >
                {this.props.title && <Title text={this.props.title} />}
                {this.props.children}
                {this.props.hasSeparator && <Separator className={s.separator} />}
            </div>
        );
    }
}

export default Section;
