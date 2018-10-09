import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { withRouter } from 'next/router';
import GoalieFactory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';

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

  handleSubmit = async (event) => {
    const {
      title, description, friend, beneficiary, deadline, amount,
    } = this.state;
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await GoalieFactory.methods
        .createGoalie(title, description, deadline, beneficiary, friend)
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
      <Layout>
        <Form onSubmit={this.handleSubmit} error={!!errorMessage}>
          <Form.Input
            label="Title"
            name="title"
            onChange={this.handleInputChange}
            value={title}
          />
          <Form.Input
            label="Description"
            name="description"
            onChange={this.handleInputChange}
            value={description}
          />
          <Form.Input
            label="Beneficiary"
            name="beneficiary"
            onChange={this.handleInputChange}
            value={beneficiary}
          />
          <Form.Input
            label="Friend"
            name="friend"
            onChange={this.handleInputChange}
            value={friend}
          />
          <Form.Input
            label="Deadline"
            name="deadline"
            onChange={this.handleInputChange}
            value={deadline}
          />
          <Form.Input
            label="Amount"
            name="amount"
            onChange={this.handleInputChange}
            value={amount}
          />
          <Message error header="Oops!" content={errorMessage} />
          <Button primary loading={loading}>
            Add Goalie
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default withRouter(GoalieForm);
