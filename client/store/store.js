import AppStateClass from './app_store';

export default AppStateClass;
export const createAppState = () => (
    new AppStateClass()
);
