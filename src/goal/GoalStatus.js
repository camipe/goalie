import React from 'react';
import PropTypes from 'prop-types';

const GoalStatus = (props) => {
  if (props.status === true) {
    return <div className="green-border">Status: <i className="fa fa-thumbs-up"></i><br/></div>
  } else {
    return <div className="red-border">Status: <i className="fa fa-thumbs-down"></i><br/></div>
  }
}

GoalStatus.propTypes = {
  status: PropTypes.bool
}

export default GoalStatus;