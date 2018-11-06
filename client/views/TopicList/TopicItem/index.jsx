import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import Primary from './Primary';
import Secondary from './Secondary';
import { routerUrl } from '../../../defaultData';


const TopicItem = ({ classes, topic }, { router }) => {
    console.log(topic);
    const pathname = `${routerUrl.topicDetail}/${topic.id}`;
    const primary = {
        title: topic.title,
        tab: topic.tab,
        pathname,
    };
    const secondary = {
        replyCount: topic.reply_count,
        visitCount: topic.visit_count,
    };
    const isCollect = topic.collect;// 是否收藏
    return (
        <ListItem className={classes.root}>
            <ListItemAvatar>
                <Avatar src={topic.author.avatar_url} />
            </ListItemAvatar>
            <ListItemText
                onClick={
                    () => router.history.push({
                        pathname,
                    })
                }
                secondary={<Secondary {...secondary} />}
                primary={<Primary {...primary} />}
            />
            <ListItemSecondaryAction>
                <Tooltip placement="top" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={isCollect ? '取消收藏' : '收藏'}>
                    <IconButton aria-label="Comments">
                        <FavoriteIcon color={isCollect ? 'secondary' : 'inherit'} />
                    </IconButton>
                </Tooltip>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
TopicItem.propTypes = {
    classes: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
};
TopicItem.contextTypes = {// 必须context
    router: PropTypes.object.isRequired,
};
export default withStyles({
    root: {},
})(TopicItem);
