import {
    observable,
    // autorun,
    computed,
    action,
    extendObservable,
} from 'mobx';
import { get, post } from '../utils/http';
import { defaultTopic, tabs, dataSourceUrl } from '../defaultData';

class Topic {
    constructor(topc) {
        extendObservable(this, defaultTopic);
        Object.assign(this, topc);
    }
}
class TopicStore {
    constructor({
        fatching, topics, itemCount, topicDetails, topicCollect,
    } =
    {
        fatching: false, topics: [], itemCount: 20, topicDetails: [], topicCollect: [],
    }) {
        this.fatching = fatching;
        this.topics = topics.map(item => new Topic(item));
        this.itemCount = itemCount;
        this.topicDetails = topicDetails;
        this.topicCollect = topicCollect;
    }

    @observable
    fatching = false

    @observable
    topics = []

    @observable
    topicCollect = []

    @observable
    topicDetails = []

    @observable
    itemCount = 20

    @computed get visibalTopics() {
        return this.topics.slice(0, this.topics.length > this.itemCount ? this.itemCount : this.topics.length);
    }

    @action
    delCollect(id) {
        const url = dataSourceUrl.delCollect;
        const accesstoken = '98cb1033-b2b3-4af3-83b1-3c03002a71e7';// 未来需要移除，将来着后台，这里为测试代码，
        return new Promise((resolve, rejects) => {
            post(url, { accesstoken, topic_id: id }).then((resp) => {
                if (resp.success) {
                    const idIndex = this.topicCollect.findIndex(val => val.id === id);
                    if (idIndex >= 0) {
                        this.topicCollect.splice(idIndex, 1);
                    }
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(rejects);
        });
    }

    @action
    fetchTopicCollect(loginname) {
        return new Promise((resolve, reject) => { // Promise对象会立即执行，当状态为resolved时触发then函数
            const url = `${dataSourceUrl.topicCollect}/${loginname}`;
            this.fatching = true;
            get(url, {}).then((datas) => {
                if (datas.success) {
                    const data = datas.data || [];
                    this.topicCollect = data;
                    this.topicCollect = data.map(item => item);
                    resolve(true);
                } else {
                    resolve(false);
                    console.log(datas.error_msg);
                }
                this.fatching = false;
            }).catch((e) => {
                this.fatching = false;
                reject(e);
            });
        });
    }

    @action
    fetchTopic(tab = tabs.all) {
        return new Promise((resolve, reject) => { // Promise对象会立即执行，当状态为resolved时触发then函数
            const url = dataSourceUrl.topicList;
            this.fatching = true;
            get(url, { tab }).then((datas) => {
                if (datas.success) {
                    const data = datas.data || [];
                    this.topics = data.map(item => new Topic(item));
                    resolve(true);
                } else {
                    resolve(false);
                    console.log(datas.error_msg);
                }
                this.fatching = false;
            }).catch((e) => {
                this.fatching = false;
                reject(e);
            });
        });
    }

    @action
    fetchTopicDetail(id) {
        return new Promise((resolve, reject) => {
            const url = `${`${dataSourceUrl.topicDetail}/${id}`}`;
            this.fatching = true;
            get(url, {
                mdrender: false,
            }).then((resp) => {
                if (resp.success) {
                    const index = this.topicDetails.findIndex(val => val.id === id);
                    if (index === -1) {
                        this.topicDetails.push(resp.data);
                    }
                    resolve(true);
                } else {
                    resolve(false);
                    console.log(resp.error_msg);
                }
            }).catch((e) => {
                this.fatching = false;
                reject(e);
            });
        });
    }
}

export default TopicStore;
