import React from 'react';
import PropType from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LastPage from '@material-ui/icons/LastPage';
import FirstPage from '@material-ui/icons/FirstPage';
import Button from '@material-ui/core/Button';

class Paging extends React.Component {
    constructor(props) {
        super(props);
        this.lastBtnHandle = this.lastBtnHandle.bind(this);
        this.nextBtnHandle = this.nextBtnHandle.bind(this);
    }

    state = {
        currentIndex: 0,
    }

    lastBtnHandle() {
        let { currentIndex } = this.state;
        const {
            lastClickHandle,
        } = this.props;
        if (currentIndex > 0) {
            currentIndex -= 1;
            this.setState({ currentIndex });
        }
        lastClickHandle(currentIndex);
    }

    nextBtnHandle() {
        let { currentIndex } = this.state;
        const {
            nextClickHandle, count = 10,
        } = this.props;
        if (currentIndex < count) {
            currentIndex += 1;
            this.setState({ currentIndex });
        }
        nextClickHandle(currentIndex);
    }

    render() {
        const {
            classes,
        } = this.props;
        const {
            count = 10,
        } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.lastPage}>
                    <Button onClick={this.lastBtnHandle} color="default">
                        <FirstPage />
                        上一页
                    </Button>
                </div>
                <div className={classes.index}>
                    <ul>
                        {
                            count <= 7
                                ? Array(...Array(count)).map((val, index) => <li key={index.toString()}>{index + 1}</li>)
                                : [1, 2, 3, '. . .', count - 3, count - 2, count - 1].map((val, index) => <li key={index.toString()}>{val}</li>)
                        }
                    </ul>
                </div>
                <div className={classes.nextPage}>
                    <Button onClick={this.nextBtnHandle} color="default">
                        下一页
                        <LastPage />
                    </Button>
                </div>
            </div>
        );
    }
}
Paging.propTypes = {
    classes: PropType.object.isRequired,
    lastClickHandle: PropType.func,
    nextClickHandle: PropType.func,
    count: PropType.number,
};


export default withStyles(theme => (
    {
        root: {
            display: 'flex',
            direction: 'row',
            '&>div': {
                display: 'flex',
            },
        },
        index: {
            flex: 3,
            '&>ul': {
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                borderRadius: 50,
                margin: 0,
                padding: 0,
                '&>li': {
                    display: 'flex',
                    flex: 1,
                    listStyle: 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        backgound: `${theme.palette.grey[500]}`,
                    },
                },
            },
        },
        lastPage: {
            flex: 1,
            marginLeft: `${theme.spacing.unit * 2}px`,
        },
        nextPage: {
            flex: 1,
            flexDirection: 'row-reverse',
            marginRight: `${theme.spacing.unit * 2}px`,
        },
    }
))(Paging);
