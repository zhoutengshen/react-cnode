import { inject } from 'mobx-react';

import authWrapper from './authWrapper';

const connectedDefaults = {
    authenticatingSelector: () => false,
};

export default (args) => {
    const { authenticatedSelector, authenticatingSelector } = {
        ...connectedDefaults,
        ...args,
    };

    return DecoratedComponent => inject((stores, props) => ({
        isAuthenticated: authenticatedSelector(stores, props),
        isAuthenticating: authenticatingSelector(stores, props),
    }))(authWrapper(args)(DecoratedComponent));
};
