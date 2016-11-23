import React, { Component, PropTypes as pt } from 'react';
import _ from 'lodash';
import hoistStatics from 'hoist-non-react-statics';

var handlers = [];

const
    MIN_SIZE = 300,
    size = {
        windowWidth: 0,
        windowHeight: 0
    },
    update = () => handlers.forEach(handler => handler(size)),
    setSize = _.debounce((width, height) => {
        size.windowWidth = width;
        size.windowHeight = height;
        update();
    }, MIN_SIZE),
    initListener = _.once(() => {
        setSize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', () => {
            setSize(window.innerWidth, window.innerHeight);
        });
    }),
    windowSize = WrappedComponent => {
        class WindowSize extends Component {
            static displayName = `WindowSize(${WrappedComponent.displayName || WrappedComponent.name})`;

            static propTypes = {
                children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
            };

            componentDidMount() {
                handlers.push(this.hanldePositionChange);
                initListener();
            }

            componentWillUnmount() {
                handlers = handlers.filter(handler => handler !== this.hanldePositionChange);
            }

            hanldePositionChange = size => this.setState(size);

            render() {
                const { children, ...rest } = this.props;

                return (
                    <WrappedComponent {...rest} {...this.state}>
                        {children}
                    </WrappedComponent>
                );
            }
        }

        return hoistStatics(WindowSize, WrappedComponent);
    };

export default windowSize;
