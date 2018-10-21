import {
    observable,
    // autorun,
    computed,
    action,
} from 'mobx';

class AppState {
    constructor({ tabIndex } = { tabIndex: 0 }) { // 没有传参数默认为 { count: 0, name: '老周' }
        this.currentTabIndex = tabIndex || 0;
    }

    @observable
    currentTabIndex;


    @computed get msg() {
        return this.currentTabIndex;
    }

    @action
    changeTabIndex(tabIndex) {
        this.currentTabIndex = tabIndex;
    }
}
export default AppState;
