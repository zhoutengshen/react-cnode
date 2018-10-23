import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import {
    AppStore,
    TopicStore,
} from '../../store/store';
import Topic from './Topic';
import TopicItemContainer from './TopicItemContainer';

@inject(({ stores }) => ({
    appStore: stores.appStore,
    topicStore: stores.topicStore,
}))
@observer
class TopicList extends Component {
    constructor(props) {
        super(props);
        this.bootstrap = this.bootstrap.bind(this);
    }


    componentDidMount() {
        const { topicStore } = this.props;
        topicStore.getTopic();
    }

    // 服务端渲染异步数据
    bootstrap() {
    }

    render() {
        const { appStore } = this.props;
        const { topicStore } = this.props;
        return (
            <div>
                <Topic />
                {appStore.currentTabIndex === 0 && <TopicItemContainer lists={topicStore.visibalTopics} />}
            </div>
        );
    }
}

TopicList.propTypes = {
    appStore: PropTypes.instanceOf(AppStore),
    topicStore: PropTypes.instanceOf(TopicStore),
};
export default TopicList;
