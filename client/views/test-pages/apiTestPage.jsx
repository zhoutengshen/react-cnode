/* eslint-disable*/
import React, { Component } from 'react';
import axios from 'axios';

class ApiTestPage extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        axios.post('/api/user/login', {
            data: {
                accessToken: '98cb1033-b2b3-4af3-83b1-3c03002a71e7',
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((resp) => {
            console.log(resp.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleLogin}>Login</button>
                <button>XX</button>
                <button>XXX</button>
            </div>
        );
    }
}
export default ApiTestPage;
/* eslint-disable */
