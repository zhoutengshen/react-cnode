import {
    observable,
    // autorun,
    computed,
    action,
} from 'mobx';

class AppState {
    constructor({ count, name } = { count: 0, name: '老周' }) { // 没有传参数默认为 { count: 0, name: '老周' }
        this.count = count || 0;// 如果传的参数没有count字段
        this.name = name || '老周';
    }

    @observable count;

    @observable name;

    @computed get msg() {
        return `${this.name} say the count is ${this.count}`;
    }

    @action add(count1 = 1) {
        this.count += count1;
    }

    @action changeName(name) {
        this.name = name;
    }
}
export default AppState;
