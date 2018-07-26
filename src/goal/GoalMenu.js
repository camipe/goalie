import React from 'react';
import PropTypes from 'prop-types';

const GoalMenu = (props) => {
  switch (props.mode) {
    case 'owner':
      return <button className="button-large pure-button">Complete</button>;
    case 'friend':
      return <button className="button-large pure-button">Approve</button>;
    case 'beneficiary':
      return <button className="button-large pure-button">Pay out</button>;
    default: 
      return null;
  }
}

GoalMenu.propTypes = {
  mode: PropTypes.string,
  approval: PropTypes.bool,
  status: PropTypes.bool,
}

export default GoalMenu;