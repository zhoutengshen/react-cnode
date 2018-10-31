import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

class User extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.avatar}>
                    <img alt="avatar" src="https://avatars2.githubusercontent.com/u/16321757?v=4&s=120" />
                </div>
                <div />
            </div>
        );
    }
}
User.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(theme => ({
    root: {
        textAlign: 'center',
        margin: 'auto',
        position: 'absolute',
        background: theme.palette.common.white,
        width: 500,
        height: 500,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '50px',
        '& div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    avatar: {
        '& img': {
            display: 'flex',
            width: 64,
            height: 64,
            borderRadius: '50%',
        },
    },
}))(User);
