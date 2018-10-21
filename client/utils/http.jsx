import axios from 'axios';

const get = (url = '', params = {}) => {
    let paramsUrl = Object.keys(params).reduce((result, val) => `${result}${val}=${params[val]}&`, `${url}?`);
    paramsUrl = paramsUrl.substring(0, paramsUrl.length - 1);
    return new Promise((resolve, reject) => {
        axios.get(paramsUrl)
            .then((res) => {
                if (res.status === 200) {
                    resolve({
                        ...res.data,
                        success: true,
                        msg: 'ok',
                    });
                } else {
                    resolve({
                        success: false,
                        msg: res.statusText,
                    });
                }
            })
            .catch(reject);
    });
};

const post = () => {

};

export {
    post,
    get,
};
