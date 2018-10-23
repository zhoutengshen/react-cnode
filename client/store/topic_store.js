import {
    observable,
    // autorun,
    // computed,
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
    constructor(fatching = false) {
        this.fatching = fatching;
    }

    @observable
    fatching = false

    @observable
    topics = []


    @action
    getTopic() {
        const url = 'https://cnodejs.org/api/v1/topics';
        this.fatching = true;
        get(url).then((datas) => {
            if (datas.success) {
                const data = datas.data || [];
                this.topics = data.map(item => new Topic(item));
            } else {
                console.log(datas.msg);
            }
            this.fatching = false;
        }).catch((e) => {
            console.log(e);
            this.fatching = false;
        });
    }
}

export default TopicStore;
