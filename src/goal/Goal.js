import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import GoalMenu from './GoalMenu';
import GoalStatus from './GoalStatus';

const Goal = (props) => {
  return (
    <div className="goal">
      <h2>{props.goal.title}</h2>
        Description: {props.goal.description}<br/>
        Amount: {props.goal.amount} wei<br/>
        Deadline: {moment(parseInt(props.goal.deadline, 10)).format("YYYY/MM/DD")}<br/>
        <hr/>
        Friend: {props.goal.friend}<br/>
        Beneficiary: {props.goal.beneficiary}<br/>
        <div className="goal-status">
          <GoalStatus approval={props.goal.approved} status={props.goal.complete}/>
        </div>
      <GoalMenu mode={props.mode}/>
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
  })
}

export default Goal;
