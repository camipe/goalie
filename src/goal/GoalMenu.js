import React from 'react';
import PropTypes from 'prop-types';

const GoalMenu = (props) => {
  switch (props.mode) {
    case 'owner':
      return <button
        onClick={props.payOwner}
        className={`button-large pure-button pure-button-primary goal-menu ${props.status ? 'pure-button-disabled' : ''}`}>Complete</button>;
    case 'friend':
      return <button 
      onClick={props.handleApproval} 
      className={`button-large pure-button pure-button-primary goal-menu ${props.approved ? 'pure-button-disabled' : ''}`}>Approve</button>;
    case 'beneficiary':
      return <button 
        onClick={props.payBeneficiary}
        className={`button-large pure-button pure-button-primary goal-menu ${(props.deadlinePassed && !props.approved) ? '' : 'pure-button-disabled'}`}>Pay out</button>;
    default: 
      return null;
  }
}

GoalMenu.propTypes = {
  mode: PropTypes.string,
  approval: PropTypes.bool,
  status: PropTypes.bool,
  deadlinePassed: PropTypes.bool,
  handleApproval: PropTypes.func,
  payOwner: PropTypes.func,
  payBeneficiary: PropTypes.func
}

export default GoalMenu;