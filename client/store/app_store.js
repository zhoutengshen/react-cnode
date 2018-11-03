import {
    observable,
    // autorun,
    // computed,
    action,
} from 'mobx';
import { dataSourceUrl } from '../defaultData';
import { post } from '../utils/http';

class AppStore {
    constructor({ userInfo, logined, isAdmin } = { userInfo: {}, logined: false, isAdmin: false }) {
        this.userInfo = userInfo;
        this.logined = logined;
        this.isAdmin = isAdmin;
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
    }

    @observable
    userInfo = {}

    @observable
    logined = false

    @observable
    isAdmin = false

    @action
    fetchUserInfo(accesstoken) {
        const url = dataSourceUrl.userInfo;
        const that = this;
        return new Promise((resolve, rejects) => {
            post(url, { accesstoken }).then((uinfo) => {
                if (uinfo.success) {
                    that.userInfo = uinfo;
                    this.logined = true;
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(rejects);
        });
    }
}
export default AppStore;
