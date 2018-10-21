import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const Primary = ({ classes, title, tab }) => (
    <div className={classes.root}>
        <span className={[classes.tab].join(' ')}>{tab}</span>
        <span className={classes.title}>{title}</span>
    </div>
);
Primary.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    tab: PropTypes.string.isRequired,
};
export default withStyles(theme => ({
    root: {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        display: ' -webkit-box',
        '-webkit-line-clamp': 2, // 向显示多少行就给多大值
        '-webkit-box-orient': 'vertical',
    },

    tab: {
        marginRight: `${theme.spacing.unit}px`,
        display: 'inline-block',
        textAlign: 'center',
        minWidth: 60,
        backgroundColor: '#e0e0e0',
        borderRadius: theme.shape.borderRadius * 10,
        lineHeight: '1.2em',
        color: '#616161',
    },
    title: {
        cursor: 'pointer',

    },
    emphasis: {
        backgroundColor: '#80bd01',
        color: theme.palette.common.white,
    },
}))(Primary);
