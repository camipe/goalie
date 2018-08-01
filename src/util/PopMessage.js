import React from 'react';
import PropTypes from 'prop-types';

const PopMessage = (props) => {
  return <div className={`alert alert-${props.type}`}>
          <span className="closebtn" onClick={props.clear}>&times;</span>
            {props.message}
          </div>
}

PopMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  clear: PropTypes.func
}

export default PopMessage;