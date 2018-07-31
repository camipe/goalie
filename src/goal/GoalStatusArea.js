import React from 'react';
import PropTypes from 'prop-types';

import ApprovalStatus from './ApprovalStatus';
import GoalStatus from './GoalStatus';

const GoalStatusArea = (props) => {
  console.log("Area props:", props)
  return (
    <div className="goal-status-area">
      <ApprovalStatus approved={props.approved}/>
      <GoalStatus status={props.status} />
  </div>
  )
}

GoalStatusArea.propTypes = {
  approved: PropTypes.bool,
  status: PropTypes.bool
}

export default GoalStatusArea;