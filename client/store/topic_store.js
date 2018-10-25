import {
    observable,
    // autorun,
    computed,
    action,
    extendObservable,
} from 'mobx';
import { get } from '../utils/http';

const defaultTopic = {
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
class Topic {
    constructor(topc) {
        extendObservable(this, defaultTopic);
        Object.assign(this, topc);
    }
}
class TopicStore {
    constructor({ fatching, topics, itemCount } = { fatching: false, topics: [], itemCount: 20 }) {
        this.fatching = fatching;
        this.topics = topics.map(item => new Topic(item));
        this.itemCount = itemCount;
    }

    @observable
    fatching = false

    @observable
    topics = []

    @observable
    itemCount = 20

    @computed get visibalTopics() {
        return this.topics.slice(0, this.topics.length > this.itemCount ? this.itemCount : this.topics.length);
    }


    @action
    getTopic() {
        return new Promise((resolve) => { // Promise对象会立即执行，当状态为resolved时触发then函数
            const url = 'https://cnodejs.org/api/v1/topics';
            this.fatching = true;
            get(url).then((datas) => {
                if (datas.success) {
                    const data = datas.data || [];
                    this.topics = data.map(item => new Topic(item));
                    resolve(true);
                } else {
                    resolve(false);
                    console.log(datas.msg);
                }
                this.fatching = false;
            }).catch((e) => {
                console.log(e);
                this.fatching = false;
                resolve(false);
            });
        });
    }
}

export default TopicStore;
