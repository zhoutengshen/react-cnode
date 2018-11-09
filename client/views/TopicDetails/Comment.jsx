import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
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
        console.log(value);
    };

    render() {
        const { handleValueChange } = this;
        const { value } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.comment}>
                    <SimpleMDE
                        valu={value}
                        onChange={handleValueChange}
                    />
                </div>
                <div className={classes.submit}>
                    <Button size="small" variant="contained" color="primary">
                        <Send />
                    </Button>
                </div>
            </div>
        );
    }
}
Comment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(() => ({
    root: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
    },
    comment: {
    },
    submit: {
        display: 'flex',
        flexDirection: 'row-reverse',
        flex: 1,
    },
}))(Comment);
