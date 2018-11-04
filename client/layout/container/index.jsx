import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import propTypes from 'prop-types';


class Conteainer extends React.Component {
    render() {
        const { classes, children } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.appBar} />
                {children}
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

    root: {
        display: 'block',
        position: 'absolute',
        margin: 0,
        padding: 0,
        width: `calc(100% - ${theme.spacing.unit * 2}px)`,
        height: `calc(100% - ${theme.spacing.unit * 2}px)`,
        maxHeight: `calc(100% - ${theme.spacing.unit * 2}px)`,
        overflow: 'auto',
        '& ::-webkit-scrollbar':
        {
            width: 16,
            height: 16,
            'background-color': '#F5F5F5',
        },
    },
    appBar: {
        height: theme.mixins.toolbar.minHeight,
    },
}))(Conteainer);
