import React from 'react';
import PropTypes from 'prop-types';

const PopMessage = (props) => {
  return <div className={`alert alert-${props.type}`}>
          <span className="closebtn">&times;</span>
            {props.message}
          </div>
}

PopMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
}

export default PopMessage;