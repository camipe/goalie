import React from 'react';
import PropTypes from 'prop-types';

/**
 * used to set the correct class to button depending on goal properties
 */
const disableOwnerButton = (props) =>  {
  if (props.status) {
    return 'pure-button-disabled'
  } else if (!props.deadlinePassed) {
    return 'pure-button-disabled'
  } else if (!props.approved) {
    return 'pure-button-disabled'
  } else {
    return ''
  }
}

/**
 * GoalMenu is a component different buttons for a goals depending on the users relation to it; owner, friend or beneficary
 */
const GoalMenu = (props) => {
  switch (props.mode) {
    case 'owner':
      return <button
        onClick={props.handleComplete}
        className={`button-large pure-button pure-button-primary goal-menu ${ disableOwnerButton(props) }`}>Complete</button>;
    case 'friend':
      return <button 
      onClick={props.handleApproval} 
      className={`button-large pure-button pure-button-primary goal-menu ${props.approved ? 'pure-button-disabled' : ''}`}>Approve</button>;
    case 'beneficiary':
      return <button 
        onClick={props.handlePayout}
        className={`button-large pure-button pure-button-primary goal-menu ${(props.deadlinePassed && !props.approved) ? '' : 'pure-button-disabled'}`}>Pay out</button>;
    default: 
      return null;
  }
}

GoalMenu.propTypes = {
  // which mode to use; owner, friend or beneficiary
  mode: PropTypes.string,
  // is the goal approved?
  approval: PropTypes.bool,
  // is the goal completed?
  status: PropTypes.bool,
  // has the deadline passed?
  deadlinePassed: PropTypes.bool,
  // function to bind to approve button
  handleApproval: PropTypes.func,
  // function to bind to pay out button
  handlePayout: PropTypes.func,
  // function to bind to complete button
  handleComplete: PropTypes.func
}

export default GoalMenu;