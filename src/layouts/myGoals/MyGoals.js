import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react';

import Goal from "../../goal/Goal";
import AddGoalForm from "../../goal/AddGoalForm";
import PopMessage from "../../util/PopMessage";

class MyGoals extends Component {
  constructor( props, context ) {
    super( props )
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.state = {
      goalKeys: [],
      message: {
        type: '',
        content: ''
      }
    }

    this.refreshGoals = this.refreshGoals.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  async componentDidMount() {
    this.cacheCallGoals();
  }

  refreshGoals() {
    this.cacheCallGoals();
  }

  async handleComplete(goalId) {
    try {
      await this.contracts.Goalie.methods.payOwner(goalId).send({from: this.props.accounts[0]});
      this.setState({ message: {type: 'success', content: 'Transaction sent successfully. Wait for changes to be included in blockchain.' }})
    } catch (error) {
      this.setState({ message: {type: 'error', content: 'Something went wrong. Transaction failed.' }})
    }
  }

  async cacheCallGoals() {
    const ids = await this.contracts.Goalie.methods.getGoalsByOwner(this.props.accounts[0]).call();
    const goalKeys = ids.map((id) => {
      return this.contracts.Goalie.methods.goals.cacheCall(id);
    })
    this.setState({goalKeys});
  }

  clearMessage(event) {
    event.preventDefault();
    this.setState({ message: {type: '', content: '' }});
  }

  renderMessage() {
    if (this.state.message.content === '') {
      return null
    } else {
      return <PopMessage type={this.state.message.type} message={this.state.message.content} clear={this.clearMessage}/>
    }
  }
  render() {
    const goals = this.state.goalKeys.map((goalKey, index) => {
      if (!(goalKey in this.props.Goalie.goals)) {
        return <p key={goalKey}>Loading</p>
      } else {
        const goal = this.props.Goalie.goals[goalKey].value;
        return <Goal 
          key={goal.id}
          mode="owner" 
          goal={goal}
          payOwner={this.handleComplete.bind(this, goal.id)}
          web3={this.web3}
          />
      }
    })

    return (
      <main className="container">
        {this.renderMessage()}
        <button onClick={this.refreshGoals} className="button-large pure-button">Refresh goals</button>

        <div className="pure-g">
          <div className="pure-u-3-5">
            {goals}
          </div>
          <div className="pure-u-2-5">
            <AddGoalForm 
              addGoal={this.contracts.Goalie.methods.addGoal}
              web3={this.web3} />
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
