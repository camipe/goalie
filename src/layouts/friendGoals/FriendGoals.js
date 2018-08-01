import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react';

import Goal from "../../goal/Goal";

class FriendGoals extends Component {
  constructor( props, context ) {
    super( props )
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.state = {
      goalKeys: [],
    }

    this.refreshGoals = this.refreshGoals.bind(this);
  }

  handleApproval(goalId, e) {
    e.preventDefault();
    const stackid = this.contracts.Goalie.methods.approveGoal(goalId).send({from: this.props.accounts[0]});
    console.log(goalId, stackid);
  }

  refreshGoals() {
    this.cacheCallGoals();
  }

  async componentDidMount() {
    this.cacheCallGoals();
  }

  async cacheCallGoals() {
    const ids = await this.contracts.Goalie.methods.getGoalsByFriend(this.props.accounts[0]).call();
    const goalKeys = ids.map((id) => {
      return this.contracts.Goalie.methods.goals.cacheCall(id);
    })
    this.setState({goalKeys});
  }
  render() {
    const goals = this.state.goalKeys.map((goalKey, index) => {
      if (!(goalKey in this.props.Goalie.goals)) {
        return <p key={goalKey}>Loading</p>
      } else {
        const goal = this.props.Goalie.goals[goalKey].value;
        return <Goal 
              key={goal.id}
              mode="friend"
              handleApproval={this.handleApproval.bind(this, goal.id)}
              goal={goal}
              web3={this.web3}
            />
      }
    })

    return (
      <main className="container">
        <button className="button-large pure-button">Refresh goals</button> 
        <div className="pure-g">
          <div className="pure-u-3-5">
            {goals}
          </div>
        </div>
      </main>
    )
  }
}

FriendGoals.contextTypes = {
  drizzle: PropTypes.object,
  drizzleStore: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    Goalie: state.contracts.Goalie,
  }
}

const FriendGoalsContainer = drizzleConnect(FriendGoals, mapStateToProps);

export default FriendGoalsContainer;

