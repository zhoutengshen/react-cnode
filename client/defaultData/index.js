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
    collect: false,
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
    signIn: '/signIn',
    userInfo: '/userinfo',

};
export const dataSourceUrl = {
    topicList: 'https://cnodejs.org/api/v1/topics',
    topicDetail: 'https://cnodejs.org/api/v1/topic',
    userInfo: 'https://cnodejs.org/api/v1/accesstoken ',
    topicCollect: 'https://cnodejs.org/api/v1/topic_collect',
    delCollect: 'https://cnodejs.org/api/v1/topic_collect/de_collect',
};
export const routerLevel = {
    all: 'all',
    loginUser: 'loginUser',
    admin: 'admin',
};
