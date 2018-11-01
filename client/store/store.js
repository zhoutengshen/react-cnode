import AppStore from './app_store';
import TopicStore from './topic_store';

export {
    AppStore,
    TopicStore,
};
export const createAppState = () => (
    new AppStore()
);

export const createStores = (__INITIAL_STATES__ = {}) => ({
    appStore: new AppStore(__INITIAL_STATES__.appStore),
    topicStore: new TopicStore(__INITIAL_STATES__.topicStore),
});
