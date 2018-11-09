import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { inject, observer } from 'mobx-react';

const styles = {
    root: {
        display: 'inline-flex',
        transition: 'width 300ms',
        width: 350,
    },
    animation: {
        display: 'inline-flex',
        transition: 'width 300ms',
        width: 0,
    },
    card: {
        maxWidth: 325,
        maxHeight: 350,
        display: 'inline-block',
        margin: 8,
    },
    header: {
        '& span': {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: 220,
        },
    },
    content: {
        height: 170,
        maxHeight: 170,
        overflow: 'hidden',
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
};
@inject(({ stores }) => ({
    topicStore: stores.topicStore,
}))
@observer
class TopicCard extends React.Component {
    state = {
        show: true,
    }

    render() {
        const {
            classes, topic, topicStore, animationDelay,//eslint-disable-line
        } = this.props;
        const { show } = this.state;
        const delCollectHandle = () => {
            this.setState({ show: false });
            setTimeout(() => {
                topicStore.delCollect(topic.id);
            }, 500);
        };
        return (
            <div className={show ? classes.root : classes.animation}>
                <Grow in timeout={animationDelay}>

                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardHeader
                                className={classes.header}
                                avatar={(
                                    <Avatar aria-label="Recipe" className={classes.avatar} src={topic.author.avatar_url} />
                                )}
                                title={topic.title}
                                subheader={topic.last_reply_at}
                            />
                            <CardContent className={classes.content}>
                                <Typography component="p">{topic.content}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Tooltip title="取消收藏" placement="top">
                                <IconButton
                                    color="secondary"
                                    onClick={delCollectHandle}
                                    aria-label="Add to favorites"
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </Card>

                </Grow>
            </div>
        );
    }
}


TopicCard.propTypes = {
    classes: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
    topicStore: PropTypes.object,
    animationDelay: PropTypes.number,
};
TopicCard.defaultProps = {
    animationDelay: 500,
};
export default withStyles(styles)(TopicCard);
