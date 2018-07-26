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
        return <span key={goalKey}>Loading</span>
      } else {
      return <Goal key={index} mode="friend" goal={this.props.Goalie.goals[goalKey].value}></Goal>
      }
    })

    return (
      <main className="container">
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

