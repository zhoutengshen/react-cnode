import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    inject,
    observer,
} from 'mobx-react';
import PropTypes from 'prop-types';
import AppState from '../../../store/app_store';


@inject('appState')
@observer
class Topic extends Component {
    constructor(props) {
        super(props);
        this.appState = props.appState;
        this.tabChangeHandle = this.tabChangeHandle.bind(this);
        this.bootstrap = this.bootstrap.bind(this);
    }

    // 服务端渲染异步数据
    bootstrap() {
    }

    tabChangeHandle(event, tabIndex) {
        this.appState.changeTabIndex(tabIndex);
    }

    render() {
        const { currentTabIndex } = this.appState;
        return (
            <div>
                <Tabs value={currentTabIndex} onChange={this.tabChangeHandle}>
                    <Tab label="全部" />
                    <Tab label="精华" />
                    <Tab label="分享" />
                    <Tab label="问答" />
                    <Tab label="招聘" />
                    <Tab label="测试" />
                </Tabs>
            </div>
        );
    }
}


Topic.propTypes = {
    appState: PropTypes.instanceOf(AppState),
};
export default withStyles(theme => ({
    root: {
        primary: theme.palette.primary,
    },
    tabRoot: {
        minWidth: 100,
    },
}))(Topic);
