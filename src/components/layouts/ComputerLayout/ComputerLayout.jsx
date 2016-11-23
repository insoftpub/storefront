import React, { Component, PropTypes as pt } from 'react';
import Header from '../../ui/pc/Header';
import Progress from '../../ui/common/Progress';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ComputerLayout.scss';

@withStyles(s)
class ComputerLayout extends Component {
    static contextTypes = {
        getCookie: pt.func.isRequired,
        setCookie: pt.func.isRequired
    };

    static propTypes = {
        hasFooter: pt.bool,
        showProgress: pt.bool,
        children: pt.node
    };

    static defaultProps = {
        hasFooter: true,
        showProgress: false
    };

    render() {
        return (
            <div>
                {this.props.showProgress && <Progress />}
                <Header />
                <div className={s.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}

export default ComputerLayout;
