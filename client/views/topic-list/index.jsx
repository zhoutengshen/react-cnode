import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
        this.changeName = this.changeName.bind(this);
    }

    changeName(name) {
        this.appState.changeName(name);
    }


    // 服务端渲染异步数据
    bootstrap() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.appState.add(10);
                resolve(true);
            }, 1000);
        });
    }

    render() {
        return (
            <div>
                <Typography variant="h6">here is topicList</Typography>
                <div>
                    <input onChange={(event) => {
                        this.changeName(event.target.value);
                    }}
                    />
                    <Button variant="contained" color="primary">
                        {this.appState.msg}
                    </Button>
                </div>
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
