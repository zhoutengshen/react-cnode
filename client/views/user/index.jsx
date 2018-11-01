import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class User extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                alignContent="center"
                alignItems="center"
                justify="center"
            >
                <Grid item md={12}>
                    <Paper className={classes.main}>
                        <img className={classes.avatar} alt="avatar" src="https://avatars2.githubusercontent.com/u/16321757?v=4&s=120" />
                        <div>
                            <TextField
                                fullWidth
                                label="Cnode accesstoken"
                            />
                        </div>
                        <Button fullWidth className={classes.button} variant="contained" color="primary">登录</Button>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
User.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(theme => ({
    root: {

    },
    main: {
        display: 'block',
        margin: '50px auto',
        padding: 40,
        height: 200,
        width: 300,
    },
    avatar: {
        display: 'block',
        width: 64,
        height: 64,
        margin: '0 auto',
        borderRadius: '50%',
    },
    button: {
        margin: `${theme.spacing.unit * 2}px 0`,
    },
}))(User);
