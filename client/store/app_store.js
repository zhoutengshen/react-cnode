import {
    observable,
    // autorun,
    computed,
    action,
} from 'mobx';

class AppStore {
    constructor({ tabIndex } = { tabIndex: 'all' }) { //
        this.currentTabIndex = tabIndex || 'all';
    }

    @observable
    currentTabIndex;


    @computed get msg() {
        return this.currentTabIndex;
    }

    @action.bound
    changeTabIndex(tabIndex) {
        this.currentTabIndex = tabIndex;
    }
}
export default AppStore;
