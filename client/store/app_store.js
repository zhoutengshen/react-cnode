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

    @action add() {
        this.count += 1;
    }

    @action changeName(name) {
        this.name = name;
    }
}
export default AppState;
