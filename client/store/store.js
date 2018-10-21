import AppStore from './app_store';
import TopicStore from './topic_store';

export {
    AppStore,
    TopicStore,
};
export const createAppState = () => (
    new AppStore()
);
