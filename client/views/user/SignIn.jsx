import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'react-router-dom/Link';
import queryString from 'query-string';
import { inject, observer } from 'mobx-react';
import { routerUrl } from '../../defaultData/index';


const MyFormControlLabel = ({ classes, signInType, text }) => (
    <div className={classes.controlLabel}>
        <div>
            <FormControlLabel label="记住密码" control={<Checkbox value="remember" color="primary" />} />
        </div>
        <div style={{ flexDirection: 'row-reverse' }}>
            <Button component={Link} to={`${routerUrl.signIn}?signInType=${signInType}`}>{text}</Button>
        </div>
    </div>
);
const SingInByAccount = ({ classes }) => (
    <form className={classes.form}>
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
        </FormControl>
        <MyFormControlLabel classes={classes} signInType="accesstokenSingIn" text="token登录" />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
        >
            {'SignIn'}
        </Button>
    </form>
);

const SingInByAccesstoken = ({ classes, getAccesstokenHandle }) => {
    let accesstokenIputRef = null;
    return (
        <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="accesstoken">accesstoken</InputLabel>
                <Input inputRef={(el) => { accesstokenIputRef = el; }} autoFocus id="accesstoken" name="accesstoken" />
            </FormControl>
            <MyFormControlLabel classes={classes} signInType="accountSingIn" text="账号登录" />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submit}
                onClick={(e) => {
                    e.preventDefault();
                    getAccesstokenHandle(accesstokenIputRef.value);
                }}
            >
                {'SingIn'}
            </Button>
        </form>
    );
};
@inject(({ stores }) => (
    {
        appStore: stores.appStore,
        topicStore: stores.topicStore,
    }
))
@observer
class SignIn extends React.Component {
    getAccesstokenHandle = (val) => {
        const { appStore, topicStore } = this.props;
        const { fetchUserInfo } = appStore;
        fetchUserInfo(val).then((isAcceped) => {
            if (isAcceped) {
                topicStore.fetchTopicCollect(appStore.userInfo.loginname);// 获取收藏列表
                const { history } = this.props;
                history.push({
                    pathname: routerUrl.userInfo,
                });
            }
        });
    }

    render() {
        const { classes, location } = this.props;
        const { search } = location;
        const loginByAccount = queryString.parse(search).signInType === 'accountSingIn';
        return (
            <div className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5"> Sign in</Typography>
                    {
                        loginByAccount
                            ? <SingInByAccount classes={classes} />
                            : <SingInByAccesstoken getAccesstokenHandle={this.getAccesstokenHandle} classes={classes} />
                    }
                </Paper>
            </div>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    appStore: PropTypes.object,
    topicStore: PropTypes.object,
    history: PropTypes.object.isRequired,
};
SingInByAccount.propTypes = {
    classes: PropTypes.object.isRequired,
    // getAccountHandle: PropTypes.func.isRequired
};
SingInByAccesstoken.propTypes = {
    classes: PropTypes.object.isRequired,
    getAccesstokenHandle: PropTypes.func.isRequired,
};
MyFormControlLabel.propTypes = {
    classes: PropTypes.object.isRequired,
    signInType: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
export default withStyles(theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    controlLabel: {
        display: 'flex',
        width: '100%',
        '&>div': {
            display: 'flex',
            flex: 1,
            alignItems: 'center',
        },
    },
}))(SignIn);
