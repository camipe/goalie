import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react';

import Goal from "../../goal/Goal";
import AddGoalForm from "../../goal/AddGoalForm";

class MyGoals extends Component {
  constructor( props, context ) {
    super( props )
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.state = {
      goals: [],
      idKey: [],
      goalKeys: [],
    }
  }
  async componentDidMount() {
    const goals = await this.getGoals();
    this.setState({goals});

    this.cacheCallGoals();
  }
  async cacheCallIds() {
    const idKey = this.contracts.Goalie.methods.getGoalsByOwner.cacheCall(this.props.accounts[0]);
    this.setState({idKey});
  }

  async cacheCallGoals() {
    const ids = await this.contracts.Goalie.methods.getGoalsByOwner(this.props.accounts[0]).call();
    const goalKeys = ids.map((id) => {
      return this.contracts.Goalie.methods.goals.cacheCall(id);
    })
    this.setState({goalKeys});
  }

  async getGoalIds() {
    const ids = this.contracts.Goalie.methods.getGoalsByOwner(this.props.accounts[0]).call();
    return ids;
  }
  async getGoals() {
    const ids = await this.getGoalIds();
    const goals = [];
    for (const id of ids) {
      const goal = await this.contracts.Goalie.methods.goals(id).call()
      goals.push(goal);
    }
    return goals;
  }
  render() {
    const goals = this.state.goalKeys.map((goalKey, index) => {
      if (!(goalKey in this.props.Goalie.goals)) {
        return <span key={goalKey}>Loading</span>
      } else {
      return <Goal key={index} goal={this.props.Goalie.goals[goalKey].value}></Goal>
      }
    })

    return (
      <main className="container">
        <div className="pure-g">
          <AddGoalForm 
            addGoal={this.contracts.Goalie.methods.addGoal}
            web3={this.web3} />
          <div className="pure-u-1-1">
            {goals}
          </div>
        </div>
      </main>
    )
  }
}

MyGoals.contextTypes = {
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

const MyGoalsContainer = drizzleConnect(MyGoals, mapStateToProps);

export default MyGoalsContainer;
