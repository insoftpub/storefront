import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContentPage.scss';
import Container from '../../ui/common/Container';

@withStyles(s)
class ContentPage extends Component {
    static pageName = 'content';

    static contextTypes = {
        setTitle: PropTypes.func.isRequired
    };

    static propTypes = {
        path: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        title: PropTypes.string
    };

    render() {
        this.context.setTitle(this.props.title);

        return (
            <Container>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }}></div>
                </div>
            </Container>
        );
    }

}

export default ContentPage;
