import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './TabsPanel.scss';
import { reduce } from 'lodash';

@withStyles(s)
class TabsPanel extends Component {
    static propTypes = {
        defaultTab: pt.number,
        activeTab: pt.number,
        onChange: pt.func,
        children: pt.node,
        className: pt.string
    };

    static defaultProps = {
        defaultTab: 0,
        activeTab: 0
    };

    constructor(props) {
        super(props);

        this.state = {
            activeTabIndex: props.defaultTab
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeTab !== this.state.activeTabIndex) {
            this.setState({ activeTabIndex: nextProps.activeTab });
        }
    }

    handleActiveTabChange(index) {
        const
            { activeTabIndex } = this.state,
            { onChange } = this.props;

        if (index !== activeTabIndex) {
            this.setState({ activeTabIndex: index });

            onChange && onChange(index);
        }
    }

    renderHeaders() {
        const
            { children } = this.props,
            { activeTabIndex } = this.state;

        return reduce(children, (memo, item, index) => {
            if (item) {
                memo.push(
                    <div
                        className={cx(s.headLink, {
                            [s.activeHeadLink]: index === activeTabIndex
                        })}
                        onClick={this.handleActiveTabChange.bind(this, index)}
                        key={index}
                    >
                        {item.props.title || index}
                    </div>
                );
            }

            return memo;
        }, []);
    }

    renderContent() {
        const
            { children } = this.props,
            { activeTabIndex } = this.state;

        return children.map((item, index) => {
            return (
                <div
                    className={cx(s.contentItem, {
                        [s.activeContentItem]: index === activeTabIndex
                    })}
                    key={index}
                >
                    {item}
                </div>
            );
        });
    }

    render() {
        return (
            <div className={cx(s.root, this.props.className)}>
                <div className={s.header}>
                    {this.renderHeaders()}
                </div>
                <div className={s.content}>
                    {this.renderContent()}
                </div>
            </div>
        );
    }

}

export default TabsPanel;
