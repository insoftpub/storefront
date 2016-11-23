import React, { Component, PropTypes as pt } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Modal.scss';
import cx from 'classnames';
import IconClose from '../Icon/Icons/Controls/Close.jsx';
import { SIZE_EXTRA_SMALL as ICON_SIZE } from '../../../../constants/icon';
import { COLOR_BLACK, COLOR_WHITE } from '../../../../constants/colors';
import Mask from '../Mask';
import Button from '../Button';
import Title from '../Title';

const MASK_OPACITY = 0.2;

@withStyles(s)
class ModalWindow extends Component {
    static propTypes = {
        className: pt.string,
        hasCancelButton: pt.bool,
        hasSubmitButton: pt.bool,
        onClose: pt.func,
        onSubmit: pt.func,
        title: pt.string,
        subtitle: pt.string,
        cancelButtonText: pt.string,
        submitButtonText: pt.string,
        controlsAlign: pt.oneOf([
            'left',
            'center',
            'right'
        ]),
        children: pt.node
    };

    static defaultProps = {
        hasCancelButton: false,
        hasSubmitButton: true,
        cancelButtonTitle: 'Отмена',
        submitButtonText: 'OK',
        controlsAlign: 'left'
    };

    handleCloseClick = () => {
        this.props.onClose && this.props.onClose();
    };

    handleCancelClick = () => {
        this.props.onClose && this.props.onClose();
    };

    handleSubmitClick = () => {
        this.props.onSubmit && this.props.onSubmit();
    };

    renderModal() {
        const {
            hasCancelButton,
            hasSubmitButton,
            title,
            subtitle,
            submitButtonText,
            cancelButtonText,
            controlsAlign
        } = this.props;

        return (
            <div className={s.dialogWrapper}>
                <div className={s.dialog}>
                    <IconClose
                        className={s.close}
                        size={ICON_SIZE}
                        onClick={this.handleCloseClick}
                    />
                    <div className={s.title}>
                        <Title text={title} subtext={subtitle} />
                    </div>
                    <div className={s.content}>
                        {this.props.children}
                    </div>
                    <div
                        className={cx(s.controls, {
                            [s.alignLeft]: controlsAlign === 'left',
                            [s.alignRight]: controlsAlign === 'right',
                            [s.alignCenter]: controlsAlign === 'center'
                        })}
                    >
                        {hasCancelButton
                        && <Button
                            frame
                            color={COLOR_WHITE}
                            onClick={this.handleCancelClick}
                        >
                            {cancelButtonText}
                        </Button>}
                        {hasSubmitButton
                        && <Button
                            frame
                            color={COLOR_BLACK}
                            onClick={this.handleSubmitClick}
                        >
                            {submitButtonText}
                        </Button>}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { className } = this.props;

        return (
            <div className={cx(className, s.root)}>
                <Mask visible className={s.mask} opacity={MASK_OPACITY} />
                {this.renderModal()}
            </div>
        );
    }
}

export default ModalWindow;

