import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import AppState from '../../store/app_store';
import Topic from './Topic';
import TopicItemContainer from './TopicItemContainer';

import data from './mockData.json';

const data1 = [...data.data].map(item => ({
    title: item.title,
    tab: item.tab,
    replyCount: item.reply_count,
    visitCount: item.visit_count,
    avatarUrl: item.author.avatar_url,
}));
@inject('appState')
@observer
class TopicList extends Component {
    constructor(props) {
        super(props);
        this.appState = props.appState;
        this.bootstrap = this.bootstrap.bind(this);
    }

    state = {
    }

    componentDidMount() {
    }

    // 服务端渲染异步数据
    bootstrap() {
    }


    render() {
        const { currentTabIndex } = this.appState;
        return (
            <div>
                <Topic />
                {currentTabIndex === 0 && <TopicItemContainer lists={[...data1]} />}
            </div>
        );
    }
}

TopicList.propTypes = {
    appState: PropTypes.instanceOf(AppState),
};
export default withStyles(theme => ({
    root: {
        primary: theme.palette.primary,
    },
}))(TopicList);
