import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { map, isArray, isEmpty } from 'lodash';
import s from './ErrorField.scss';
import cx from 'classnames';

@withStyles(s)
class ErrorField extends Component {
    static propTypes = {
        className: pt.string,
        errors: pt.oneOfType([
            pt.array,
            pt.string
        ])
    };

    static defaultProps = {
        errors: []
    };

    render() {
        let { errors } = this.props;

        if (!errors || isEmpty(errors)) {
            return null;
        }

        if (!isArray(errors)) {
            errors = [errors];
        }

        return (
            <div className={cx(s.root, this.props.className)}>
                {map(errors, (error, key) =>
                    <span
                        key={'error-' + key}
                        className={s.errorText}
                    >
                        {error}
                    </span>
                )}
            </div>
        );
    }
}

export default ErrorField;
