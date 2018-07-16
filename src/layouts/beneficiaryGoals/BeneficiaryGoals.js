import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import Goal from "../../goal/Goal";

class BeneficiaryGoals extends Component {
  constructor( props, context ) {
    super( props )
    
    this.contracts = context.drizzle.contracts
    this.state = {
      testGoal: {
        title: "Testing",
        description: "Just testing component",
        owner: "0xc8DaE4BEc5EAe38C25991C0f7eEb0f683eA4FF85",
        beneficiary: "0x247080353466978b5a3B27F8B74898a07607ddEc",
        amount: 123241231,
        deadline: 1529066379,
        nrOfFriends: 2,
        approvals: ["0x9d30613A0d005691237dccF99115c5b5c561E434"],
      }
    }
  }
  async componentDidMount() {
    let goal = await this.contracts.Goalie.methods.goals(0).call();
    console.log(goal);
  }
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            BENEFICIARY
          </div>
        </div>
      </main>
    )
  }
}

BeneficiaryGoals.contextTypes = {
  drizzle: PropTypes.object
}

export default BeneficiaryGoals;
