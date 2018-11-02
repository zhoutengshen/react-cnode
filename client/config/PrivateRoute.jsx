import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { routerLevel, routerUrl } from '../defaultData';

@inject(({ stores }) => (
    {
        appStore: stores.appStore,
    }
))
@observer
class PrivateRoute extends React.Component {
    componentWillMount() {
        const {
            appStore, history, level,
        } = this.props;
        if (level === routerLevel.all) {//eslint-disable-line

        } else if (level === routerLevel.loginUser) {
            if (!appStore.logined) {
                history.replace(routerUrl.signIn);
            }
        } else if (level === routerLevel.admin) {
            if (!appStore.isAdmin) {
                history.replace(routerUrl.root);
            }
        }
    }

    render() {
        const { component, path } = this.props;
        return (<Route component={component} path={path} />);
    }
}
PrivateRoute.propTypes = {
    appStore: PropTypes.object,
    level: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.func.isRequired]),
    path: PropTypes.string.isRequired,
    history: PropTypes.object,
};
PrivateRoute.defaultProps = {
    level: routerLevel.all,
};
export default withRouter(PrivateRoute);
