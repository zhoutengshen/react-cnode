/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";

class ApiTestPage extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        let data = "accessToken=98cb1033-b2b3-4af3-83b1-3c03002a71e7"
        axios.post('/api/user/login?a=oieu', data,{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((resp) => {
            console.log(resp.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                <Button color="primary" variant="fab" onClick={this.handleLogin}>Login</Button>
                <Button color="secondary" variant="extendedFab">XX</Button>
                <Button color="default" variant="contained">XXX</Button>
            </div>
        );
    }
}
export default ApiTestPage;
/* eslint-disable */
