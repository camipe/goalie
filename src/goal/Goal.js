import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import GoalMenu from './GoalMenu';
import GoalStatusArea from './GoalStatusArea';

/**
 * Used to check if the deadline has passed
 * @param {int} deadline the deadline in unix time in ms
 */
const checkDeadline = (deadline) => {
  return (deadline <= new Date().getTime())
}

/**
 * Goal is used to render a representation of a goal
 */
const Goal = (props) => {
  return (
    <div className="goal">
      <div className="goal-content">
        <h2>{props.goal.title}</h2>
          <b>Description:</b> {props.goal.description}<br/>
          <b>Amount:</b> {props.web3.utils.fromWei(props.goal.amount, 'ether')} Ξ<br/>
          <b>Deadline:</b> {moment(parseInt(props.goal.deadline, 10) * 1000).format("YYYY/MM/DD")}<br/>
          {/* Note that the deadline must be multiplied by 1000 since JS uses unix time in ms vs seconds in Solidity*/}
          <hr/>
          <b>Friend:</b> {props.goal.friend}<br/>
          <b>Beneficiary:</b> {props.goal.beneficiary}<br/>
          <div className="goal-status">
            <GoalStatusArea approved={props.goal.approved} status={props.goal.complete}/>
          </div>
        </div>
      <GoalMenu 
        mode={props.mode}
        payOwner={props.payOwner}
        payBeneficiary={props.payBeneficiary}
        handleApproval={props.handleApproval}
        approved={props.goal.approved}
        status={props.goal.complete}
        deadlinePassed={checkDeadline(parseInt(props.goal.deadline, 10) * 1000)}
        />
    </div>
  )
}

Goal.propTypes = {
  // goal object read from blockchain
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
  // function to trigger an approval of a goal on the blockchain
  handleApproval: PropTypes.func,
  // function to trigger a payout to the owner and completion of a goal on the blockchain
  handleComplete: PropTypes.func,
  // function to trigger a payout to the beneficiary and completion of a goal on the blockchain
  handlePayout: PropTypes.func,
  // used to access some web3 utility functions
  web3: PropTypes.object
}

export default Goal;
