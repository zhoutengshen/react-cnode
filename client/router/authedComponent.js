import SignIn from '../views/user/SignIn';
import UserInfo from '../views/user/UserInfo';
import connectedAuthWrapper from './connectedAuthWrapper';
import { routerUrl } from '../defaultData';

// 没有登录用户重定向到登录页面
export const AuthedUserInfo = connectedAuthWrapper({// 定义授权规则
    redirectPath: routerUrl.signIn,
    authenticatedSelector: stores => stores.stores.appStore.logined, // 授权规则-->只允许登录用户查看
    wrapperDisplayName: 'AuthedUserInfo',
})(UserInfo);

// 对于登录用户登去登录页面将被重定向到个人信息页面
export const AuthedSignIn = connectedAuthWrapper({
    redirectPath: routerUrl.userInfo,
    authenticatedSelector: stores => !stores.stores.appStore.logined, // 授权规则-->登录用户不可见登录页面，重定向到个人信息页面
    wrapperDisplayName: 'AuthedSignIn',
})(SignIn);
