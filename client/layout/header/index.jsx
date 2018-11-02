import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ProtoType from 'prop-types';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { routerUrl } from '../../defaultData';


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
                    <IconButton component={Link} to={routerUrl.root} color="inherit" onClick={this.homeBtnClick}>
                        <HomeIcon />
                    </IconButton>
                    <Typography className={classes.title} color="inherit" variant="h6">My CNode</Typography>
                    <IconButton component={Link} to={routerUrl.signIn} color="inherit">
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
    link: {
        color: 'inherit',
    },
}))(Header);
