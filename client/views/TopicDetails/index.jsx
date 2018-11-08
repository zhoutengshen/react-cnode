import React, { Component } from 'react';
import {
    inject,
    observer,
} from 'mobx-react';
import PropTypes from 'prop-types';
import marked from 'marked';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grid from '@material-ui/core/Grid';
import { TopicStore } from '../../store/store';
import Comment from './Comment';

@inject(({ stores }) => ({
    topicStore: stores.topicStore,
}))
@observer
class TopicDetails extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.fetchData();
    }

    getTopicId() {
        const { router } = this.context;
        const { pathname } = router.history.location;
        const id = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);
        return id;
    }


    fetchData() {
        const { topicStore } = this.props;
        const id = this.getTopicId();
        return topicStore.fetchTopicDetail(id);// 必须返回一个Promise 且resovled(true)
    }

    // 服务端渲染异步数据
    bootstrap() {
        return this.fetchData();
    }

    render() {
        const { topicStore, classes } = this.props;
        const topicDetail = topicStore.topicDetails.find(val => val.id === this.getTopicId()) || {};
        const replies = topicDetail.replies || [];
        return (
            <Grid
                container
                justify="center"
                alignContent="center"
                alignItems="center"
            >
                <Grid item md={6}>
                    <div className={classes.root}>
                        <Typography className={classes.typographyRoot} color="inherit" align="center" variant="h4">{topicDetail.title}</Typography>

                        <hr />
                        <p dangerouslySetInnerHTML={{ __html: marked(topicDetail.content || '') }} />
                        <div className={classes.comment}>
                            <span>
                                {`${replies.length}条评论`}
                            </span>
                            <List>
                                {
                                    replies.map(item => (
                                        <div key={item.id}>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <Avatar src={item.author.avatar_url} />
                                                </ListItemIcon>
                                                <ListItemText primary={item.author.loginname} secondary={item.create_at} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <Avatar />
                                                </ListItemIcon>
                                                <Typography variant="h6">{item.content}</Typography>
                                            </ListItem>
                                        </div>
                                    ))
                                }
                            </List>
                        </div>
                        <div>
                            <Comment />
                        </div>
                    </div>
                </Grid>
            </Grid>
        );
    }
}
TopicDetails.propTypes = {
    topicStore: PropTypes.instanceOf(TopicStore),
    classes: PropTypes.object.isRequired,
};
export default withStyles(theme => ({
    root: {
        padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
        '&>hr': {
            margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
        },
    },
    typographyRoot: {
        padding: `${theme.spacing.unit * 0}px ${theme.spacing.unit * 2}px`,
    },
    comment: {
        background: '#ededed',
        '&>span': {
            display: 'block',
            textAlign: 'center',
            padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
            fontSize: '2em',
        },
    },
}))(TopicDetails);
