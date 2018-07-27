import React from 'react';
import PropTypes from 'prop-types';

const ApprovalStatus = (props) => {
  if (props.approval === true) {
    return <div className="green-border">Approved: <i className="fa fa-thumbs-up"></i><br/></div>
  } else {
    return <div className="red-border">Approved: <i className="fa fa-thumbs-down"></i><br/></div>
  }
}

const GoalStatus = (props) => {
  if (props.status === true) {
    return <div className="green-border">Status: <i className="fa fa-thumbs-up"></i><br/></div>
  } else {
    return <div className="red-border">Status: <i className="fa fa-thumbs-down"></i><br/></div>
  }
}

const GoalStatusArea = (props) => {
  return (
    <div className="goal-status-area">
      <ApprovalStatus approval={props.approved}/>
      <GoalStatus status={props.status} />
  </div>
  )
}

GoalStatus.propTypes = {
  approved: PropTypes.bool,
  status: PropTypes.bool
}

export default GoalStatusArea;