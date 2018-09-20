import React, { Component } from 'react';
import {
    inject,
    observer,
} from 'mobx-react';
import PropTypes from 'prop-types';
import AppState from '../../store/app_store';


@inject('appState')
@observer
class TopicList extends Component {
    constructor(props) {
        super(props);
        this.appState = props.appState;
        this.changeName = this.changeName.bind(this);
    }

    changeName(name) {
        this.appState.changeName(name);
    }

    render() {
        return (
            <div>
                here is topicList
                <div>
                    {' '}
                    <input onChange={(event) => {
                        this.changeName(event.target.value);
                    }}
                    />
                    <h3>
                        {this.appState.msg}
                    </h3>
                </div>
            </div>
        );
    }
}
TopicList.propTypes = {
    appState: PropTypes.instanceOf(AppState),
};
export default TopicList;
