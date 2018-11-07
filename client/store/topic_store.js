import {
    observable,
    // autorun,
    computed,
    action,
    // extendObservable,
} from 'mobx';
import { get, post } from '../utils/http';
import { defaultTopic, tabs, dataSourceUrl } from '../defaultData';

class Topic {
    constructor(topc) {
        Object.assign(this, defaultTopic);
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
    itemCount = 0

    @computed
    get visibalTopics() { // 按需显示
        const startIndex = this.topics.length > this.itemCount ? this.itemCount : this.topics.length;
        const someTopics = this.topics.slice(0, startIndex);
        // 按需过滤
        const result = someTopics.map((item) => {
            const index = this.topicCollect.findIndex(cItem => cItem.id === item.id);
            if (index !== -1) {
                return {
                    ...item,
                    collect: true,
                    toggleCollectHandel: this.delCollect.bind(this),
                };
            }

            return {
                ...item,
                toggleCollectHandel: this.collect.bind(this),
            };
        });
        return result;
    }

    @action
    collect(id) {
        const url = dataSourceUrl.collect;
        const accesstoken = '98cb1033-b2b3-4af3-83b1-3c03002a71e7';// 未来需要移除，将来着后台，这里为测试代码，
        const item = this.topics.find(val => val.id === id);
        if (item) {
            this.topicCollect.push(item);
        }
        return new Promise((resolve, rejects) => {
            post(url, { accesstoken, topic_id: id }).then((resp) => {
                if (resp.success) {
                    resolve(true);
                } else {
                    this.topicCollect.pop();
                    resolve(false);
                }
            }).catch((e) => {
                this.topicCollect.pop();
                rejects(e);
            });
        });
    }

    @action
    delCollect(id) {
        const url = dataSourceUrl.delCollect;
        const accesstoken = '98cb1033-b2b3-4af3-83b1-3c03002a71e7';// 未来需要移除，将来着后台，这里为测试代码，
        const idIndex = this.topicCollect.findIndex(val => val.id === id);// 换一个思路，马上移除，使得界面立刻响应，如果后台移除失败，则重新push回去
        let removedTopicCollect = {};
        if (idIndex >= -1) {
            removedTopicCollect = this.topicCollect.splice(idIndex, 1);
        }
        return new Promise((resolve, rejects) => {
            post(url, { accesstoken, topic_id: id }).then((resp) => {
                if (resp.success) {
                    resolve(true);
                } else { // 后台失败，从新加入数据，是的界面从新还原
                    this.topicCollect.push(...removedTopicCollect);
                    resolve(false);
                }
            }).catch((e) => {
                this.topicCollect.push(...removedTopicCollect);
                rejects(e);
            });
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
                    this.topicCollect = data.map(item => item);
                    this.topicCollect.forEach((val) => { // 找出收藏的项
                        const arm = this.topics.find(topic => topic.id === val.id);
                        if (arm) {
                            arm.collect = true;
                        }
                    });
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
            const limit = 40;
            get(url, { tab, limit }).then((datas) => {
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
