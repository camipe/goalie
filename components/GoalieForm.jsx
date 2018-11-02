import React, { Component } from 'react';
import {
  Button, Form, Message, Card,
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { withRouter } from 'next/router';
import moment from 'moment';
import GoalieFactory from '../ethereum/factory';
import web3 from '../ethereum/web3';

/**
 * GoalieForm is used to show a form where users can add a new goalie to the blockchain
 */
class GoalieForm extends Component {
  state = {
    title: '',
    description: '',
    friend: '',
    beneficiary: '',
    deadline: '',
    amount: '',
    errorMessage: '',
    loading: false,
  }

  /**
   * Function for doing the actual submit and starting a transaction on ethereum
   */
  handleSubmit = async (event) => {
    const {
      title, description, friend, beneficiary, deadline, amount,
    } = this.state;
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    // deadline needs to be converted to seconds since unix epoch because that is used in solidity
    const formattedDeadline = moment(deadline).unix();

    try {
      const accounts = await web3.eth.getAccounts();
      await GoalieFactory.methods
        .createGoalie(title, description, formattedDeadline, beneficiary, friend)
        .send({
          from: accounts[0],
          value: web3.utils.toWei(amount, 'ether'),
        });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  }

  /**
  * function used to update state when users changes one of the form inputs
  */
  handleInputChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const {
      title, description, friend, beneficiary, deadline, amount, errorMessage, loading,
    } = this.state;

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Create a new Goalie</Card.Header>
          <Card.Description>
            <Form onSubmit={this.handleSubmit} error={!!errorMessage}>
              <Form.Input
                label="Title"
                name="title"
                onChange={this.handleInputChange}
                value={title}
                placeholder="Title"
              />
              <Form.TextArea
                label="Description"
                name="description"
                onChange={this.handleInputChange}
                value={description}
                placeholder="Description"
              />
              <Form.Input
                label="Beneficiary"
                name="beneficiary"
                onChange={this.handleInputChange}
                value={beneficiary}
                placeholder="Beneciary address"
              />
              <Form.Input
                label="Friend"
                name="friend"
                onChange={this.handleInputChange}
                value={friend}
                placeholder="Friend address"
              />
              <Form.Field>
                <label htmlFor="deadline">Deadline</label>
                <DateInput
                  name="deadline"
                  placeholder="Deadline"
                  value={deadline}
                  iconPosition="left"
                  dateFormat="YYYY-MM-DD"
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Input
                label="Amount"
                name="amount"
                onChange={this.handleInputChange}
                value={amount}
                placeholder="Amount of ether"
              />
              <Message error header="Oops!" content={errorMessage} />
              <Button primary loading={loading}>
               Add Goalie
              </Button>
            </Form>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(GoalieForm);
