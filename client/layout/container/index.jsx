import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import propTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';


class Conteainer extends React.Component {
    render() {
        const { classes, children } = this.props;
        return (
            <Grid

                className={classes.root}
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item md={6} className={classes.root}>
                    <div className={classes.appBar} />
                    <Paper className={classes.paper} elevation={1}>
                        {children}
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

Conteainer.propTypes = {
    classes: propTypes.object.isRequired,
    children: propTypes.oneOfType([
        propTypes.element,
        propTypes.string,
    ]),
};

export default withStyles(theme => ({
    root: {
    },
    appBar: {
        height: theme.mixins.toolbar.minHeight,
    },
    paper: {
        width: '100%',
        marginTop: 20,
    },
}))(Conteainer);
