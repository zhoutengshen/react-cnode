const axios = require("axios");
const basePath = "https://cnodejs.org/api/v1";
module.exports = (req, resp, next) => {
    let requestPath = req.path;
    let isNeddAccessToken = req.params.isNeddAccessToken;
    let user = req.session.user || {};
    if (isNeddAccessToken && !user.accessToken) {//这个请求接口需要Token但是没有提供
        resp.status(401).send(
            {
                success: false,
                msg: " need to login "
            }
        );
    }

    let query = {
        ...req.query,
        isNeddAccessToken: ""
    }
    axios({
        url: basePath + requestPath,
        medth: req.method,
        data: {
            ...req.body,
            accesstoken: user.accessToken
        },
        params: query,
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resp1) => {
        resp.status(resp1.status).send(resp1.data);
    }).catch((e) => {
        if (e.response) {
            resp.status(500).send({
                ...e.response,
                request: null
            });
        } else {
            resp.status(500).send({
                success: false,
                msg: " 未知错误 "
            });
        }
    });
};
