import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import {
  Grid,
  Statistic,
  Card,
  Header,
  Icon,
} from 'semantic-ui-react';
import moment from 'moment';
import Layout from '../../components/Layout';
import GoalieMenu from '../../components/GoalieMenu';
import { Router } from '../../routes';
import web3 from '../../ethereum/web3';
import Goalie from '../../ethereum/goalie';

const propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  amount: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
};

/**
 * GoalieDetails is a page component. It renders the details of a goalie but also
 * a menu enabling users to approve and complete goalies.
 */
class GoalieDetails extends Component {
  state = {
    loadingApprove: false,
    loadingComplete: false,
    errorMessage: '',
    role: '',
  }

  static async getInitialProps(props) {
    const { address } = props.query;

    const goalie = Goalie(address);
    const details = await goalie.methods.details().call();

    let amount = await web3.eth.getBalance(address);
    amount = web3.utils.fromWei(amount, 'ether');

    return { address, amount, details };
  }

  async componentDidMount() {
    const { details } = this.props;
    let role;

    const accounts = await web3.eth.getAccounts();

    // comparing the user's address to the goalie's different roles
    if (accounts[0] === details.owner) {
      role = 'owner';
    } else if (accounts[0] === details.beneficiary) {
      role = 'beneficiary';
    } else if (accounts[0] === details.friend) {
      role = 'friend';
    } else {
      role = '';
    }

    this.setState({ role });
  }

  /**
   * Function to update the approval status on the blockchain.
   */
  handleApproval = async (event) => {
    event.preventDefault();
    const { address } = this.props;

    this.setState({ loadingApprove: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      const goalie = Goalie(address);

      await goalie.methods.approveGoal().send({ from: accounts[0] });
      Router.pushRoute('goalieDetails', { address });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loadingApprove: false });
  }

  /**
   * Function to update the completed status on the blockchain.
   */
  handleComplete = async (event) => {
    event.preventDefault();
    const { address } = this.props;

    this.setState({ loadingComplete: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      const goalie = Goalie(address);

      await goalie.methods.completeGoal().send({ from: accounts[0] });
      Router.pushRoute('goalieDetails', { address });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loadingComplete: false });
  }

  render() {
    const { amount, details } = this.props;
    const {
      loadingApprove, loadingComplete, errorMessage, role,
    } = this.state;
    return (
      <Layout>
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column width="11">
              <Card fluid>
                <Card.Content>
                  <Card.Header>{details.title}</Card.Header>
                  <Card.Meta>
                    <Icon name="calendar alternate" />
                    {`Expires at ${moment(parseInt(details.deadline, 10) * 1000).format('YYYY/MM/DD')}`}
                  </Card.Meta>
                </Card.Content>
                <Card.Content>
                  <Grid>
                    <Grid.Row columns="2">
                      <Grid.Column width="12">
                        <Header sub>Description</Header>
                        {details.description}
                      </Grid.Column>
                      <Grid.Column width="4" textAlign="center">
                        <Statistic size="small" label="Ether" value={amount} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
                <Card.Content>
                  <Header sub>Addresses</Header>
                  {`Owner: ${details.owner}`}
                  <br />
                  {`Beneficiary: ${details.beneficiary}`}
                  <br />
                  {`Friend:${details.friend}`}
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width="5">
              <GoalieMenu
                details={details}
                loadingApprove={loadingApprove}
                loadingComplete={loadingComplete}
                errorMessage={errorMessage}
                handleApproval={this.handleApproval}
                handleComplete={this.handleComplete}
                role={role}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

GoalieDetails.propTypes = propTypes;

export default withRouter(GoalieDetails);
