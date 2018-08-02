import React from 'react';
import PropTypes from 'prop-types';

/**
 * GoalStatus is a component to present if goal is completed
 */
const GoalStatus = (props) => {
  if (props.status === true) {
    return <div className="green-border">Status: <i className="fa fa-thumbs-up"></i><br/></div>
  } else {
    return <div className="red-border">Status: <i className="fa fa-thumbs-down"></i><br/></div>
  }
}

GoalStatus.propTypes = {
  // is the goal complete or not?
  status: PropTypes.bool
}

export default GoalStatus;