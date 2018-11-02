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

const post = (url, data) => new Promise((resolve, reject) => {
    axios.post(url, data).then((resp) => {
        if (resp.data.success) {
            resolve({
                ...resp.data,
                success: true,
            });
        } else {
            resolve({
                success: false,
                msg: resp.statusText,
            });
        }
    }).catch(reject);
});

export {
    post,
    get,
};
