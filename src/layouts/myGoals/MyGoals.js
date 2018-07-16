import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Goal from "../../goal/Goal";
import AddGoalForm from "../../goal/AddGoalForm";

class MyGoals extends Component {
  constructor( props, context ) {
    super( props )
    
    this.contracts = context.drizzle.contracts
    this.state = {
      testGoal: {
        title: "Testing",
        description: "Just testing component",
        owner: "0xc8DaE4BEc5EAe38C25991C0f7eEb0f683eA4FF85",
        beneficiary: "0x247080353466978b5a3B27F8B74898a07607ddEc",
        friend: "0x37A1a60A7f7533E301F71db5e3CBA5F5B94F4aF0",
        amount: 123241231,
        deadline: 1529066379,
        approved: "false",
        complete: "false",
      }
    }
  }
  async componentDidMount() {
    let goal = await this.contracts.Goalie.methods.goals(0).call();
    console.log(goal);
  }
  async getGoalIds() {
    return [1,2,3];
  }
  async getGoals() {
    return {};
  }
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <AddGoalForm/>
          <div className="pure-u-1-1">
            <Goal goal={this.state.testGoal}></Goal>
          </div>
        </div>
      </main>
    )
  }
}

MyGoals.contextTypes = {
  drizzle: PropTypes.object
}

export default MyGoals;
