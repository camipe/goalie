import React from 'react';
import PropTypes from 'prop-types';

/**
 * ApprovalStatus is a component to present the current approval status of a goal
 */
const ApprovalStatus = (props) => {
  if (props.approved === true) {
    return <div className="green-border">Approved: <i className="fa fa-thumbs-up"></i><br/></div>
  } else {
    return <div className="red-border">Approved: <i className="fa fa-thumbs-down"></i><br/></div>
  }
}

ApprovalStatus.propTypes = {
  // is the goal approved or not?
  approved: PropTypes.bool
}

export default ApprovalStatus;