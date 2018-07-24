import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'

const Goal = (props) => {
  console.log(props.goal.deadline / 1)
  return (
    <div>
      <h2>{props.goal.title}</h2>
        {props.goal.description}<br/>
        Friend: {props.goal.friend}<br/>
        Beneficiary: {props.goal.beneficiary}<br/>
        Amount: {props.goal.amount}<br/>
        Deadline: {moment(parseInt(props.goal.deadline, 10)).format("YYYY/MM/DD")}<br/>
        Approved: {props.goal.approved}<i className="fa fa-thumbs-down"></i><br/>
        Status: {props.goal.complete}<br/>
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
    amount: PropTypes.string,
    deadline: PropTypes.string,
    approved: PropTypes.bool,
    complete: PropTypes.bool,
  })
}

export default Goal;
