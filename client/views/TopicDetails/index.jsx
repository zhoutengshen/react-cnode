import React, { Component } from 'react';
import {
    inject,
    observer,
} from 'mobx-react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { TopicStore } from '../../store/store';

@inject(({ stores }) => ({
    topicStore: stores.topicStore,
}))
@observer
class TopicDetails extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.getData();
    }

    getTopicId() {
        const { router } = this.context;
        const { pathname } = router.history.location;
        const id = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);
        return id;
    }

    getData() {
        const { topicStore } = this.props;
        const id = this.getTopicId();
        return topicStore.fetchTopicDetail(id);// 必须返回一个Promise 且resovled(true)
    }

    // 服务端渲染异步数据
    bootstrap() {
        return this.getData();
    }

    createMarkup() {
        const { topicStore } = this.props;
        const topicDetail = topicStore.topicDetails.find(val => val.id === this.getTopicId());
        const content = topicDetail ? (topicDetail.content || '') : '';
        return { __html: marked(content) };
    }

    render() {
        return (
            <div dangerouslySetInnerHTML={this.createMarkup()} />
        );
    }
}
TopicDetails.propTypes = {
    topicStore: PropTypes.instanceOf(TopicStore),
};
export default TopicDetails;
