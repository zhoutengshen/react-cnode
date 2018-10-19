import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import propTypes from 'prop-types';

class Conteainer extends React.Component {
    render() {
        const { classes, children } = this.props;
        return (
            <div>
                <div className={classes.appBar} />
                <Paper className={classes.paper} elevation={4}>
                    {children}
                </Paper>
            </div>
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
    appBar: {
        height: theme.mixins.toolbar.minHeight,
    },
    paper: {
        width: '100%',
        maginTop: 20,
    },
}))(Conteainer);
