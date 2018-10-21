import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Primary from './Primary';
import Secondary from './Secondary';

const TopicItem = ({ classes, topic }) => {
    const primary = {
        title: topic.title,
        tab: topic.tab,
    };
    const secondary = {
        replyCount: topic.replyCount,
        visitCount: topic.visitCount,
    };
    return (
        <ListItem className={classes.root}>
            <ListItemAvatar>
                <Avatar src={topic.avatarUrl} />
            </ListItemAvatar>
            <ListItemText
                secondary={<Secondary {...secondary} />}
                primary={<Primary {...primary} />}
            />
        </ListItem>
    );
};
TopicItem.propTypes = {
    classes: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
};
export default withStyles({
    root: {},
})(TopicItem);
