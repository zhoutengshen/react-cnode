import React from 'react';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import TopicItem from '../TopicItem';

const TopicItemContainer = ({ lists, hidden }) => (
    <List hidden={!hidden}>
        {lists.map((item, index) => (<TopicItem key={index.toString()} topic={item} />))}
    </List>
);

TopicItemContainer.propTypes = {
    lists: PropTypes.array,
    hidden: PropTypes.bool,
};
TopicItemContainer.defaultProps = {
    hidden: false,
};
export default TopicItemContainer;
