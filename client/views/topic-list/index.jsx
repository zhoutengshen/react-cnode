import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    inject,
    observer,
} from 'mobx-react';
import PropTypes from 'prop-types';
import AppState from '../../store/app_store';


@inject('appState')
@observer
class TopicList extends Component {
    constructor(props) {
        super(props);
        this.appState = props.appState;
        this.tabChangeHandle = this.tabChangeHandle.bind(this);
        this.bootstrap = this.bootstrap.bind(this);
    }

    state = {
        currentIndex: 0,
    }

    // 服务端渲染异步数据
    bootstrap() {
        return new Promise((resolve) => {
            resolve(true);
        });
    }

    tabChangeHandle(event, index) {
        this.setState({
            currentIndex: index,
        });
    }

    render() {
        const { currentIndex } = this.state;
        return (
            <Tabs value={currentIndex} fullWidth onChange={this.tabChangeHandle}>
                <Tab label="全部" />
                <Tab label="精华" />
                <Tab label="分享" />
                <Tab label="问答" />
                <Tab label="招聘" />
                <Tab label="客户端测试" />
            </Tabs>
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
