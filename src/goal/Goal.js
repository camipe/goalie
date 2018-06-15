import React from 'react';
import PropTypes from 'prop-types';

const Goal = (props) => {
  return (
    <div>
      <p>
        Title: {props.goal.title}<br/>
        Description: {props.goal.description}<br/>
        Beneficiary: {props.goal.beneficiary}<br/>
        Amount: {props.goal.amount}<br/>
        Deadline:{props.goal.deadline}<br/>
        {props.goal.approvals.length} of {props.goal.nrOfFriends} approvals.
      </p>
      <button>Complete</button>
      <button>Approve</button>
      <button>Pay out</button>
    </div>
  )
}

Goal.propTypes = {
  goal: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    beneficiary: PropTypes.string,
    amount: PropTypes.number,
    deadline: PropTypes.number,
    nrOfFriends: PropTypes.number,
    approvals: PropTypes.array,
  }),
  isOwner: PropTypes.bool,
  isBeneficiary: PropTypes.bool,
  isFriend: PropTypes.bool
}

export default Goal;
