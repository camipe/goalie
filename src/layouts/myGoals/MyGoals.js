import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react';

import Goal from "../../goal/Goal";
import AddGoalForm from "../../goal/AddGoalForm";
import PopMessage from "../../util/PopMessage";

/**
 * MyGoals is a container for showing all goals where user is the owner
 */
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
    this.setMessage = this.setMessage.bind(this);
  }

  async componentDidMount() {
    this.cacheCallGoals();
  }

  /**
   * Used to let users manually refresh the goal cache instead of refreshing whole page
   */
  refreshGoals() {
    this.cacheCallGoals();
  }

  /**
   * Used to handle when the user clicks to complete a goal
   */
  async handleComplete(goalId) {
    try {
      await this.contracts.Goalie.methods.payOwner(goalId).send({from: this.props.accounts[0]});
      this.setMessage('success', 'Transaction sent successfully. Wait for changes to be included in blockchain.')
    } catch (error) {
      this.setMessage('error', 'Something went wrong. Transaction failed.')
    }
  }

  /**
   * Used to cache the keys from drizzle representing each goal which then will be rendered by renderGoals().
   */
  async cacheCallGoals() {
    const ids = await this.contracts.Goalie.methods.getGoalsByOwner(this.props.accounts[0]).call();
    const goalKeys = ids.reverse().map((id) => {
      return this.contracts.Goalie.methods.goals.cacheCall(id);
    })
    this.setState({goalKeys});
  }

  /**
   * Used to clear any user messages
   */
  clearMessage(event) {
    this.setState({ message: { type: '', content: '' }});
  }

  /**
   * Used to set a success or error message to be displayed to the user
   */
  setMessage(type, content) {
    this.setState({ message: { type, content }})
  }

  /**
   * Used to render a success or error message to user if one is set in state
   */
  renderMessage() {
    if (this.state.message.content === '') {
      return null
    } else {
      return <PopMessage type={this.state.message.type} message={this.state.message.content} clear={this.clearMessage}/>
    }
  }

  /**
   * Checks if goals exists in drizzle's state and renders them
   */
  renderGoals() {
    return this.state.goalKeys.map((goalKey, index) => {
      if (!(goalKey in this.props.Goalie.goals)) {
        return <p key={goalKey}>Loading</p>
      } else {
        const goal = this.props.Goalie.goals[goalKey].value;
        return <Goal 
          key={goal.id}
          mode="owner" 
          goal={goal}
          handleComplete={this.handleComplete.bind(this, goal.id)}
          web3={this.web3}
          />
      }
    })
  }

  render() {
    return (
      <main className="container">
        {this.renderMessage()}
        <button onClick={this.refreshGoals} className="button-large pure-button">Refresh goals</button>

        <div className="pure-g">
          <div className="pure-u-3-5">
            {this.renderGoals()}
          </div>
          <div className="pure-u-2-5">
            <AddGoalForm 
              addGoal={this.contracts.Goalie.methods.addGoal}
              web3={this.web3} 
              setMessage={this.setMessage}
              />
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
