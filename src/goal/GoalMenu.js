import React from 'react';
import PropTypes from 'prop-types';

const GoalMenu = (props) => {
  switch (props.mode) {
    case 'owner':
      return <button className="button-large pure-button goal-menu">Complete</button>;
    case 'friend':
      return <button onClick={props.handleApproval} className="button-large pure-button goal-menu">Approve</button>;
    case 'beneficiary':
      return <button className="button-large pure-button goal-menu">Pay out</button>;
    default: 
      return null;
  }
}

GoalMenu.propTypes = {
  mode: PropTypes.string,
  approval: PropTypes.bool,
  status: PropTypes.bool,
  handleApproval: PropTypes.func,
  payOwner: PropTypes.func,
  payBeneficiary: PropTypes.func
}

export default GoalMenu;