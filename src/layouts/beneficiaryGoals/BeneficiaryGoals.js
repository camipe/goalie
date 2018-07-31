import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react';

import Goal from "../../goal/Goal";

class BeneficiaryGoals extends Component {
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

  handlePayout(goalId, e) {
    e.preventDefault();
    const stackid = this.contracts.Goalie.methods.payBeneficiary(goalId).send({from: this.props.accounts[0]});
    console.log(goalId, stackid);
  }

  async cacheCallGoals() {
    const ids = await this.contracts.Goalie.methods.getGoalsByBeneficiary(this.props.accounts[0]).call();
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
        const goal = this.props.Goalie.goals[goalKey].value;
        return <Goal 
          key={index} 
          mode="beneficiary" 
          goal={goal}
          payBeneficiary={this.handlePayout.bind(this, goal.id)}
          />
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

BeneficiaryGoals.contextTypes = {
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

const BeneficiaryGoalsContainer = drizzleConnect(BeneficiaryGoals, mapStateToProps);

export default BeneficiaryGoalsContainer;
