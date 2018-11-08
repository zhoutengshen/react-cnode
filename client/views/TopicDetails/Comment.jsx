import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';//eslint-disable-line

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'hello world',
        };
    }

    handleValueChange = (value) => {
        this.setState({ value });
    };

    render() {
        const { handleValueChange } = this;
        const { value } = this.state;
        return (
            <SimpleMDE
                valu={value}
                onChange={handleValueChange}
            />
        );
    }
}
export default Comment;
