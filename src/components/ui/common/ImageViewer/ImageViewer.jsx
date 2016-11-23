import React, { Component, PropTypes as pt } from 'react';
import Image from '../Image';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageViewer.scss';
import cx from 'classnames';
import { map } from 'lodash';
import SwipeableViews from '../SwipeableViews';

@withStyles(s)
class ImageViewer extends Component {
    static contextTypes = {
        executeAction: pt.func.isRequired,
        getUserAgent: pt.func.isRequired
    };

    static propTypes = {
        className: pt.string,
        images: pt.array
    };

    static defaultProps = {
        className: '',
        images: []
    };

    state = {
        activeImageIndex: 0,
        imagePreviewsLoaded: true
    };

    isDesktop = this.context.getUserAgent().isDesktop;

    handleImagePreviewLoading = () => {
        this.imagesLoading++;

        if (this.state.imagePreviewsLoaded && this.imagesLoading > 0) {
            this.setState({ imagePreviewsLoaded: false });
        }
    };

    handlerImagePreviewLoaded = () => {
        this.imagesLoading--;

        if (!this.state.imagePreviewsLoaded && this.imagesLoading === 0) {
            this.setState({ imagePreviewsLoaded: true });
        }
    };

    handleMainImageIndexChange = index => {
        this.setState({ activeImageIndex: index });
    };

    imagesLoading = 0;

    renderPreviews() {
        const { activeImageIndex, imagePreviewsLoaded } = this.state;

        return (
            <div className={s.previews}>
                {map(this.props.images, (image, index) =>
                    <Image
                        key={index}
                        src={image.url}
                        className={cx(s.previewImage, {
                            [s.active]: activeImageIndex === index && imagePreviewsLoaded
                        })}
                        onClick={() => this.handleMainImageIndexChange(index)}
                        onLoading={this.handleImagePreviewLoading}
                        onLoad={this.handlerImagePreviewLoaded}
                    />)}
            </div>
        );
    }

    renderPagination() {
        const { activeImageIndex, imagePreviewsLoaded } = this.state;

        return (
            <div className={s.owlPagination}>
                {map(this.props.images, (image, index) =>
                    <div
                        key={index}
                        className={cx(s.owlPage, {
                            [s.active]: activeImageIndex === index && imagePreviewsLoaded
                        })}
                        onClick={() => this.handleMainImageIndexChange(index)}
                    >
                    </div>
                )}
            </div>
        );
    }

    renderViewer() {
        return (
            <SwipeableViews
                resistance
                index={this.state.activeImageIndex}
                className={s.viewer}
                onChangeIndex={this.handleMainImageIndexChange}
                springConfig={{
                    stiffness: 250,
                    damping: 36
                }}
            >
                {map(this.props.images, (image, index) =>
                    <div key={index} className={s.centered}>
                        <Image key={index} src={image.url} />
                    </div>)}
            </SwipeableViews>
        );
    }

    render() {
        return (
            <div className={cx(s.root, this.props.className)}>
                {this.renderViewer()}
                {this.isDesktop
                    ? this.renderPreviews()
                    : this.renderPagination()}
            </div>
        );
    }
}

export default ImageViewer;
