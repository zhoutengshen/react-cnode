import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TopicCollectContainer from './TopicCollectContainer';

@inject(({ stores }) => ({
    appStore: stores.appStore,
    topicStore: stores.topicStore,
}))
@observer
class UserInfo extends React.Component {
    componentDidMount() {
        const { topicStore, appStore } = this.props;
        topicStore.fetchTopicCollect(appStore.userInfo.loginname);// 获取收藏列表
    }

    render() {
        const { appStore, topicStore, classes } = this.props;
        const bgStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            filter: 'blur(20px)',
            background: `url(${appStore.userInfo.avatar_url}) no-repeat`,
            backgroundSize: '100% 100%',
            zIndex: -99,
        };

        const topicCollect = topicStore.visibalTopicCollect || [];
        console.log(topicCollect);
        return (
            <div className={classes.root}>
                <div className={classes.userInfo}>
                    <div style={bgStyle} />
                    <Avatar className={classes.avatar} src={appStore.userInfo.avatar_url} />
                    <Typography variant="h3">{appStore.userInfo.loginname}</Typography>
                </div>
                <div className={classes.topicCollectes}>
                    <Grid
                        container
                        justify="center"
                        direction="row"
                    >
                        <Grid
                            item
                            md={9}
                        >
                            <TopicCollectContainer topicCollect={topicCollect} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
UserInfo.propTypes = {
    appStore: PropTypes.object,
    classes: PropTypes.object.isRequired,
    topicStore: PropTypes.object,
};


const style = () => ({
    root: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        minHeight: '150%',
        width: '100%',
    },
    userInfo: {
        display: 'flex',
        // position: 'relative',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
    },
    topicCollectes: {
        flex: 2,
        display: 'flex',

    },
});

export default withStyles(style)(UserInfo);
