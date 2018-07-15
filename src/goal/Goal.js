import React from 'react';
import PropTypes from 'prop-types';

const Goal = (props) => {
  return (
    <div>
      <h2>{props.goal.title}</h2>
      <p>
        {props.goal.description}<br/>
        Beneficiary: {props.goal.beneficiary}<br/>
        Friend: {props.goal.beneficiary}<br/>
        Amount: {props.goal.amount}<br/>
        Deadline:{props.goal.deadline}<br/>
        Approved: {props.goal.approved}<br/>
        Status: {props.goal.complete}<br/>
      </p>
      <button className="pure-button">Complete</button>
      <button className="pure-button">Approve</button>
      <button className="pure-button">Pay out</button>
    </div>
  )
}

Goal.propTypes = {
  goal: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    beneficiary: PropTypes.string,
    friend: PropTypes.string,
    amount: PropTypes.number,
    deadline: PropTypes.number,
    approved: PropTypes.bool,
    complete: PropTypes.bool,
  })
}

export default Goal;
