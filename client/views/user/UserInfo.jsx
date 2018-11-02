import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

@inject(({ stores }) => (
    {
        appStore: stores.appStore,
    }
))
@observer
class UserInfo extends React.Component {
    render() {
        const { appStore } = this.props;
        return (<div>{appStore.userInfo.loginname}</div>);
    }
}
UserInfo.propTypes = {
    appStore: PropTypes.object,
};
export default UserInfo;
