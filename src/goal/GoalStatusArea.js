import React from 'react';
import PropTypes from 'prop-types';

import ApprovalStatus from './ApprovalStatus';
import GoalStatus from './GoalStatus';

/**
 * GoalStatusArea is a container component to present the current statuses of a goal
 */
const GoalStatusArea = (props) => {
  return (
    <div className="goal-status-area">
      <ApprovalStatus approved={props.approved}/>
      <GoalStatus status={props.status} />
  </div>
  )
}

GoalStatusArea.propTypes = {
  // is the goal approved or not?
  approved: PropTypes.bool,
  // is it's status complete or not?
  status: PropTypes.bool
}

export default GoalStatusArea;