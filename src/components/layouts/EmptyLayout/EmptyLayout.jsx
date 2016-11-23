import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EmptyLayout.scss';
import Progress from '../../ui/common/Progress';

@withStyles(s)
class EmptyLayout extends Component {
    static propTypes = {
        children: pt.node,
        showProgress: pt.bool
    };

    static defaultProps = {
        showProgress: false
    };

    render() {
        return (
            <div className={s.root}>
                {this.props.showProgress && <Progress />}
                <div
                    className={s.content}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default EmptyLayout;
