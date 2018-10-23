import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    inject,
    observer,
} from 'mobx-react';
import PropTypes from 'prop-types';
import { AppStore } from '../../../store/store';


@inject(({ stores }) => ({
    appStore: stores.appStore,
}))
@observer
class Topic extends Component {
    constructor(props) {
        super(props);
        this.tabChangeHandle = this.tabChangeHandle.bind(this);
        this.bootstrap = this.bootstrap.bind(this);
    }

    // 服务端渲染异步数据
    bootstrap() {
    }

    tabChangeHandle(event, tabIndex) {
        const { appStore } = this.props;
        appStore.changeTabIndex(tabIndex);
    }

    render() {
        const { appStore } = this.props;
        return (
            <div>
                <Tabs fullWidth value={appStore.currentTabIndex} onChange={this.tabChangeHandle}>
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
    appStore: PropTypes.instanceOf(AppStore),
};
export default withStyles(theme => ({
    root: {
        primary: theme.palette.primary,
    },
    tabRoot: {
        minWidth: 100,
    },
}))(Topic);
