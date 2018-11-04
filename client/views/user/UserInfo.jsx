import React from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

class UserInfo extends React.Component {
    render() {
        const { appStore, classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.userInfo}>
                    <div>
                        {appStore.userInfo.loginname}
                    </div>
                </div>
                <div className={classes.topicCollectes} />
            </div>
        );
    }
}
UserInfo.propTypes = {
    appStore: PropTypes.object,
    classes: PropTypes.object.isRequired,
};


const style = () => ({
    root: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        background: 'red',
        minHeight: '150%',
        width: '100%',
        '&::before': {
            content: '""',
        },
    },
    userInfo: props => ({
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
            content: '""',
            position: 'absolute',
            filter: 'blur(20px)',
            background: `url(${props.appStore.userInfo.avatar_url}) no-repeat`,
            backgroundSize: '100% 100%',
        },
    }),
    topicCollectes: {
        flex: 2,
        background: 'yellow',
    },
});

export default inject(({ stores }) => ({ appStore: stores.appStore }))(observer(injectSheet(style)(UserInfo)));
