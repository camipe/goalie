import React, { Component } from 'react'
import PropTypes from 'prop-types';

class AddGoalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      friend: '',
      beneficiary: '',
      deadline: '',
      amount: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.addGoal(
      this.state.title, 
      this.state.description, 
      this.state.friend, 
      this.state.beneficiary, 
      this.state.deadline)
      .send({from: this.props.web3.eth.accounts[0], value: this.props.web3.utils.toWei(this.state.amount, "ether")});
    console.log(this.state);    
  }
  render() {
    return (
      <div className="pure-u-1-1">
        <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Create a new goal</legend>
            <div className="pure-control-group">
              <label htmlFor="goalTitle">Title:</label>
              <input 
                type="text" 
                name="title" 
                id="goalTitle"
                onChange={this.handleInputChange} />
            </div>
            <div className="pure-control-group">
              <label htmlFor="goalDescription">Description:</label>
              <input 
                type="text" 
                name="description" 
                id="goalDescription"
                onChange={this.handleInputChange} />
            </div>
            <div className="pure-control-group">
              <label htmlFor="goalFirend">Friend:</label>
              <input 
                type="text" 
                name="friend" 
                id="goalFirend"
                onChange={this.handleInputChange} />
            </div>
            <div className="pure-control-group">
              <label htmlFor="goalBeneficiary">Beneficiary:</label>
              <input 
                type="text" 
                name="beneficiary" 
                id="goalBeneficiary"
                onChange={this.handleInputChange} />
            </div>
            <div className="pure-control-group">
              <label htmlFor="goalDeadline">Deadline:</label>
              <input 
                type="text" 
                name="deadline" 
                id="goalDeadline"
                onChange={this.handleInputChange} />
            </div>
            <div className="pure-control-group">
              <label htmlFor="goalAmount">Amount:</label>
              <input 
                type="text" 
                name="amount" 
                id="goalAmount"
                onChange={this.handleInputChange} />
            </div>
            <div className="pure-control">
              <button type="submit" className="pure-button pure-button-primary">Submit</button>
            </div>
         </fieldset>
        </form>

      </div>
    )
  }
}

AddGoalForm.propTypes = {
  addGoal: PropTypes.func.isRequired,
  web3: PropTypes.object.isRequired
}

export default AddGoalForm;