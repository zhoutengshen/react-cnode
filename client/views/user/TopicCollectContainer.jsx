import React from 'react';
import PropTypes from 'prop-types';
import TopicCard from './TopicCard';

const TopicCollectContainer = ({ topicCollect }) => (
    <div>
        {
            topicCollect.map((item, index) => (<TopicCard animationDelay={(index + 1) * 500} topic={item} key={item.id} />))
        }
    </div>
);

TopicCollectContainer.propTypes = {
    topicCollect: PropTypes.array,
};

export default TopicCollectContainer;
