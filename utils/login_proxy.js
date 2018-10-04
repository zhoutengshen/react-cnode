const router = require('express').Router();
const { snake2camal } = require("./caseChanger");
const axios = require('axios');

const basePath = "https://cnodejs.org/api/v1";
router.post('/login', (req, resp, next) => {
    console.log(req.body);
    req.body = req.body || {};
    let data = "accesstoken="+req.body.accessToken;
    axios.post(`${basePath}/accesstoken`,data,{
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((resp1) => {
        var user = snake2camal(resp1.data) || {};
        if (resp1.status === 200 && resp1.data.success) {
            req.session.user = user;
        }
        resp.status(resp1.status).send({
            ...user
        });
    }).catch((error) => {
        if (error.response) {
            resp.send(
                {
                    ...snake2camal({//统一返回数据命名都是骆驼命名法
                        ...error.response,
                        request: null
                    })
                }
            );
        } else {
            next(error);
        }
    });
});
module.exports = router;

