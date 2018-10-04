import {
    observable,
    // autorun,
    computed,
    action,
} from 'mobx';

class AppState {
    @observable count = 0;

    @observable name = '老周';

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
