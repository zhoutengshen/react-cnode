import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import { tabs } from '../../../defaultData';

class Topic extends Component {
    static contextTypes = {
        router: PropTypes.object,
    }


    constructor(props) {
        super(props);
        this.tabChangeHandle = this.tabChangeHandle.bind(this);
    }

    tabChangeHandle(event, val) {
        const { router } = this.context;
        router.history.push({
            ...router.history.location,
            search: `?tab=${val}`,
        });
    }

    render() {
        const { router } = this.context;
        const { classes } = this.props;
        const { pathname, search } = router.history.location;
        const tab = queryString.parse(search).tab || Object.keys(tabs)[0];
        return (
            <div>
                <Tabs fullWidth value={tab} onChange={this.tabChangeHandle}>
                    {
                        Object.keys(tabs).map(val => (
                            <Tab
                                label={<a className={classes.label} onClick={e => e.preventDefault()} href={`${pathname}?tab=${val}`}>{tabs[val]}</a>
                                }
                                value={val}
                                key={val}
                            />
                        ))
                    }
                </Tabs>
            </div>
        );
    }
}
Topic.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(theme => ({
    label: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
    },
}))(Topic);
