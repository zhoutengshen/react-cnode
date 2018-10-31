export const defaultTopic = {
    id: '',
    author_id: '',
    tab: '',
    content: '',
    title: '',
    last_reply_at: '',
    good: false,
    top: false,
    reply_count: 0,
    visit_count: 0,
    create_at: '0',
    author: {
        loginname: '',
        avatar_url: '',
    },
};
export const tabs = {
    all: '全部',
    good: '精华',
    share: '分享',
    ask: '问答',
    job: '招聘',
    dev: '测试',
};
export const routerUrl = {
    root: '/',
    topicList: '/list',
    topicDetail: '/detail',
    user: '/user',
};
export const dataSourceUrl = {
    topics: 'https://cnodejs.org/api/v1/topics',
    detail: 'https://cnodejs.org/api/v1/topic',

};
