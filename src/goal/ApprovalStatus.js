import React from 'react';
import PropTypes from 'prop-types';

const ApprovalStatus = (props) => {
  console.log(props)
  if (props.approved === true) {
    return <div className="green-border">Approved: <i className="fa fa-thumbs-up"></i><br/></div>
  } else {
    return <div className="red-border">Approved: <i className="fa fa-thumbs-down"></i><br/></div>
  }
}

ApprovalStatus.propTypes = {
  approved: PropTypes.bool
}

export default ApprovalStatus;