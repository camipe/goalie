import React from 'react';
import PropTypes from 'prop-types';

/**
 * PopMessage can be used to show some kind of success or error message to user
 */
const PopMessage = (props) => {
  return <div className={`alert alert-${props.type}`}>
          <span className="closebtn" onClick={props.clear}>&times;</span>
            {props.message}
          </div>
}

PopMessage.propTypes = {
  // success or error message?
  type: PropTypes.string,
  // the message to display
  message: PropTypes.string,
  // function to clear message from state in parent
  clear: PropTypes.func
}

export default PopMessage;