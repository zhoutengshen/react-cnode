import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import {
    AppStore,
    TopicStore,
} from '../../store/store';
import Topic from './Topic';
import TopicItemContainer from './TopicItemContainer';

@inject((stores) => {
    console.log(stores);
    return {
        appStore: stores.appStore,
        topicStore: stores.topicStore,
    };
})
@observer
class TopicList extends Component {
    constructor(props) {
        super(props);
        this.appStore = props.appStore;
        this.topicStore = props.topicStore;
        this.bootstrap = this.bootstrap.bind(this);
        console.log(props);
    }

    state = {
    }

    componentDidMount() {
        const { getTopic } = this.topicStore;
        getTopic();
    }

    // 服务端渲染异步数据
    bootstrap() {
    }


    render() {
        const { currentTabIndex } = this.AppStore;
        const { topics } = this.topicStore;
        return (
            <div>
                <Topic />
                {currentTabIndex === 0 && <TopicItemContainer lists={[topics]} />}
            </div>
        );
    }
}

TopicList.propTypes = {
    appStore: PropTypes.instanceOf(AppStore),
    topicStore: PropTypes.instanceOf(TopicStore),
};
export default withStyles(theme => ({
    root: {
        primary: theme.palette.primary,
    },
}))(TopicList);
