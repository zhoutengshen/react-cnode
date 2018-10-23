import React from 'react';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import TopicItem from '../TopicItem';

const TopicItemContainer = ({ lists }) => (
    <List>
        {lists.map((item, index) => (<TopicItem key={index.toString()} topic={item} />))}
    </List>
);

TopicItemContainer.propTypes = {
    lists: PropTypes.array,
};

export default TopicItemContainer;
