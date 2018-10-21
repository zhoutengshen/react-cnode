import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const Secondary = ({ classes, replyCount, visitCount }) => (
    <span className={classes.root}>
        <s className={[classes.replyCount, classes.count].join(' ')}>{replyCount}</s>
        <i>/</i>
        <s className={[classes.count, classes.visitCount].join(' ')}>{visitCount}</s>
    </span>
);
Secondary.propTypes = {
    classes: PropTypes.object.isRequired,
    replyCount: PropTypes.number.isRequired,
    visitCount: PropTypes.number.isRequired,
};
export default withStyles(theme => ({
    root: {

    },
    count: {
        textDecoration: 'none',
        margin: `0 ${theme.spacing.unit * 0.5}px`,
    },
    replyCount: {
        color: theme.palette.text.primary,
    },
    visitCount: {
        color: theme.palette.text.secondary,
    },
}))(Secondary);
