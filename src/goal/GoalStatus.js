import React from 'react';
import PropTypes from 'prop-types';

const ApprovalStatus = (props) => {
  if (props.approval === true) {
    return <div>Approved: <i className="fa fa-thumbs-up"></i><br/></div>
  } else {
    return <div>Approved: <i className="fa fa-thumbs-down"></i><br/></div>
  }
}

const GoalStatus = (props) => {
  if (props.status === true) {
    return <div>Status: <i className="fa fa-thumbs-up"></i><br/></div>
  } else {
    return <div>Status: <i className="fa fa-thumbs-down"></i><br/></div>
  }
}

const GoalStatusArea = (props) => {
  return (
    <div className="goal-status">
      <ApprovalStatus approval={props.approval}/>
      <GoalStatus status={props.status} />
  </div>
  )
}

GoalStatus.propTypes = {
  approval: PropTypes.bool,
  status: PropTypes.bool
}

export default GoalStatusArea;