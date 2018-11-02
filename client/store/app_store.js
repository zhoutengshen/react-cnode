import {
    observable,
    // autorun,
    // computed,
    action,
} from 'mobx';
import { dataSourceUrl } from '../defaultData';
import { post } from '../utils/http';

class AppStore {
    constructor({ userInfo } = { userInfo: {} }) {
        this.userInfo = userInfo;
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
    }

    @observable
    userInfo = {}

    @action
    fetchUserInfo(accesstoken) {
        const url = dataSourceUrl.userInfo;
        const that = this;
        return new Promise((resolve, rejects) => {
            post(url, { accesstoken }).then((uinfo) => {
                if (uinfo.success) {
                    that.userInfo = uinfo;
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(rejects);
        });
    }
}
export default AppStore;
