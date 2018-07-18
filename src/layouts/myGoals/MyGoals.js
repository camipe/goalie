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
      goals: []
    }
  }
  async componentDidMount() {
    const goals = await this.getGoals();
    console.log(goals)
    this.setState({goals});
  }
  async getGoalIds() {
    const ids = await this.contracts.Goalie.methods.getGoalsByOwner(this.props.accounts[0]).call();
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
    const test = "Testning"

    const goals = this.state.goals.map((goal, index) =>
    <Goal key={index} goal={goal}></Goal>
    );

    return (
      <main className="container">
        <div className="pure-g">
          <AddGoalForm 
            addGoal={this.contracts.Goalie.methods.addGoal}
            web3={this.web3} />
          <div className="pure-u-1-1">
            {goals}
            {test}
          </div>
        </div>
      </main>
    )
  }
}

MyGoals.contextTypes = {
  drizzle: PropTypes.object
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
