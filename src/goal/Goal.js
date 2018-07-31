import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import GoalMenu from './GoalMenu';
import GoalStatusArea from './GoalStatusArea';

// contracts.Goalie.methods.approveGoal.cacheCall

const Goal = (props) => {
  return (
    <div className="goal">
      <div className="goal-content">
        <h2>{props.goal.title}</h2>
          <b>Description:</b> {props.goal.description}<br/>
          <b>Amount:</b> {props.goal.amount} wei<br/>
          <b>Deadline:</b> {moment(parseInt(props.goal.deadline, 10)).format("YYYY/MM/DD")}<br/>
          <hr/>
          <b>Friend:</b> {props.goal.friend}<br/>
          <b>Beneficiary:</b> {props.goal.beneficiary}<br/>
          <div className="goal-status">
            <GoalStatusArea approved={props.goal.approved} status={props.goal.complete}/>
          </div>
        </div>
      <GoalMenu mode={props.mode} handleApproval={props.handleApproval}/>
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
    amount: PropTypes.string,
    deadline: PropTypes.string,
    approved: PropTypes.bool,
    complete: PropTypes.bool,
  }),
  approveGoal: PropTypes.func,
  payOwner: PropTypes.func,
  payBeneficiary: PropTypes.func
}

export default Goal;
