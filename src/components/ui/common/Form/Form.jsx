import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import fieldsMap from './fieldsMap';
import s from './Form.scss';
import cx from 'classnames';
import validators from '../../../../utils/validators';
import { forEach, find, isEmpty, isEqual, reduce } from 'lodash';

@withStyles(s)
class Form extends Component {
    static propTypes = {
        name: pt.string,
        items: pt.array,
        onSubmit: pt.func,
        onChange: pt.func,
        onRef: pt.func,
        inline: pt.bool,
        autoChangeDirection: pt.bool,
        marginSize: pt.oneOf([
            'small',
            'medium',
            'large'
        ]),
        showLabels: pt.bool,
        labelsPosition: pt.oneOf([
            'left',
            'top',
            'right'
        ]),
        editable: pt.bool,
        className: pt.string
    };

    static defaultProps = {
        inline: false,
        autoChangeDirection: false,
        marginSize: 'medium',
        showLabels: false,
        labelsPosition: 'top',
        editable: true,
        items: []
    };

    constructor(props) {
        super(props);

        this.validations = {};
        this.state = {
            values: {}
        };
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this);
        this.setDefaultProps(this.props.items);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(this.state.values) && nextProps.needsCleaning) {
            this.clear();
        }
        if (!isEqual(nextProps.items, this.props.items)) {
            this.setDefaultProps(nextProps.items);
        }
    }

    getMarginClassName(field) {
        const { marginSize } = this.props;

        switch (field.marginSize) {
        case 'small': return s.smallMargin;
        case 'medium': return s.mediumMargin;
        case 'large': return s.largeMargin;
        default: return field.noMargin ? s.rowNoMargin : s[`${marginSize}Margin`];
        }
    }

    handleInputChange(fieldName, value) {
        const { values } = this.state;

        this.validations[fieldName] = this.validateField(fieldName, value);

        this.setState({
            values: {
                ...values,
                [fieldName]: value
            }
        });

        this.props.onChange && this.props.onChange({ [fieldName]: value });
    }

    handleSubmit = event => {
        event && event.preventDefault();

        this.submit();
    };

    submit() {
        const { values } = this.state;

        if (this.validateForm()) {
            this.props.onSubmit && this.props.onSubmit(values);
        } else {
            this.setState(this.state);
        }
    }

    setDefaultProps(itemsArray) {
        let
            defValues = {},
            items = itemsArray || this.props.items;

        items.map(field => {
            if (field.value) {
                defValues[field.name] = field.value;
            }
        });

        this.setState({ values: defValues });
    }

    validateForm() {
        forEach(this.props.items, field => {
            if (!field.hidden) {
                this.validations[field.name] = this.validateField(field.name, this.state.values[field.name]);
            }
        });

        return !find(this.validations, { isValid: false });
    }

    validateField(fieldName, value = '') {
        const field = find(this.props.items, { name: fieldName });
        let isValid = true, error = '';

        if (field && field.validators && !isEmpty(field.validators)) {
            forEach(field.validators, (options, key) => {
                if (isValid) {
                    const validationResult = validators[key](field.title, value, options);

                    if (typeof validationResult === 'string') {
                        isValid = false;
                        error = validationResult;
                    }
                }
            });
        }

        return {
            isValid,
            error
        };
    }

    createField(field) {
        const
            FieldComponent = fieldsMap[field.type] || fieldsMap.text,
            fieldValidation = this.validations[field.name] || {
                isValid: true,
                error: ''
            };

        return React.createElement(FieldComponent, {
            wide: true,
            invalid: !fieldValidation.isValid,
            error: fieldValidation.error,
            required: field.validators && field.validators.required,
            onChange: value => this.handleInputChange(field.name, value),
            showLabel: this.props.showLabels,
            labelPosition: this.props.labelsPosition,
            editable: this.props.editable && !field.nonEditable,
            defaultValue: this.state.values[field.name],
            ...field
        });
    }

    clear() {
        this.validations = {};
        this.setState({ values: {} });
    }

    renderItems() {
        const { items } = this.props;

        return reduce(items, (memo, field, index) => {
            if (field.hidden) {
                return memo;
            }

            memo.push(
                <div
                    key={field.key || field.name || index}
                    className={
                        cx(
                            s.row,
                            this.getMarginClassName(field),
                            field.wrapperName
                        )
                    }
                    style={{ flexGrow: field.flexGrow }}
                >
                    {this.createField(field)}
                </div>
            );

            return memo;
        }, []);
    }

    render() {
        return (
            <div className={cx(s.root, this.props.className)}>
                <form
                    id={this.props.name}
                    className={cx({
                        [s.inline]: this.props.inline,
                        [s.changeDirection]: this.props.autoChangeDirection
                    })}
                    onSubmit={this.handleSubmit}
                    action=''
                >
                    {this.renderItems()}
                </form>
            </div>
        );
    }
}

export default Form;
