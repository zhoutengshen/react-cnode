import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ProtoType from 'prop-types';
// import Button from "@material-ui/core/Button";
import AccountCircle from '@material-ui/icons/AccountCircle';
// import SearchIcon from "@material-ui/icons/Search";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.homeBtnClick = this.homeBtnClick.bind(this);
    }

    /* eslint-disable */
    homeBtnClick() {
    }

    /* eslint-enable */
    render() {
        const { classes } = this.props;
        return (
            <AppBar position="fixed" className={classes.root}>
                <Toolbar color="inherit">
                    <IconButton color="inherit" onClick={this.homeBtnClick}>
                        <HomeIcon />
                    </IconButton>
                    <Typography className={classes.title} color="inherit" variant="h6">My CNode</Typography>
                    <IconButton />
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    classes: ProtoType.object.isRequired,
};

export default withStyles(theme => ({
    root: {
        width: '100%',
    },
    title: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit * 1,
    },
}))(Header);
