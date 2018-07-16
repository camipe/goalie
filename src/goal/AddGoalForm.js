import React, { Component } from 'react'

class AddGoalForm extends Component {
  render() {
    return (
      <div className="pure-u-1-1">
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <legend>Create a new goal</legend>
            <div className="pure-control-group">
              <label htmlFor="goalTitle">Title:</label>
              <input type="text" name="title" id="goalTitle"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="goalDescription">Description:</label>
              <input type="text" name="descriptiom" id="goalDescription"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="goalFirend">Friend:</label>
              <input type="text" name="friend" id="goalFirend"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="goalBeneficiary">Beneficiary:</label>
              <input type="text" name="beneficiary" id="goalBeneficiary"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="goalDeadline">Deadline:</label>
              <input type="text" name="deadline" id="goalDeadline"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="goalAmount">Amount:</label>
              <input type="text" name="amount" id="goalAmount"/>
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

export default AddGoalForm;
