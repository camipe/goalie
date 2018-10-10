import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import {
  Grid,
  Statistic,
  Card,
  Header,
  Button,
} from 'semantic-ui-react';
import moment from 'moment';
import web3 from '../../ethereum/web3';
import Goalie from '../../ethereum/goalie';
import Layout from '../../components/Layout';

class GoalieDetails extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;

    const goalie = Goalie(address);
    const details = await goalie.methods.details().call();
    const value = '1';

    return { address, details, value };
  }

  static propTypes = {
    details: PropTypes.objectOf(PropTypes.node).isRequired,
    value: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
  }

  handleApproval = async (event) => {
    event.preventDefault();
    const { address } = this.props;

    try {
      const accounts = await web3.eth.getAccounts();
      const goalie = Goalie(address);
      await goalie.methods.approveGoal().send({ from: accounts[0] });
    } catch (error) {
      console.log(error);
    }
  }

  handleComplete = async (event) => {
    event.preventDefault();
    const { address } = this.props;

    try {
      const accounts = await web3.eth.getAccounts();
      const goalie = Goalie(address);
      await goalie.methods.completeGoal().send({ from: accounts[0] });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { details, value } = this.props;
    return (
      <Layout>
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column width="12">
              <Card fluid>
                <Card.Content>
                  <Card.Header>{details.title}</Card.Header>
                  <Card.Meta>{`Expires at ${moment(parseInt(details.deadline, 10) * 1000).format('YYYY/MM/DD')}`}</Card.Meta>
                </Card.Content>
                <Card.Content>
                  <Grid>
                    <Grid.Row columns="2">
                      <Grid.Column width="12">
                        <Header sub>Description</Header>
                        {details.description}
                      </Grid.Column>
                      <Grid.Column width="4" textAlign="center">
                        <Statistic horizontal label="Ether" value={value} />
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
            <Grid.Column width="4">
              <Card fluid>
                <Card.Content extra>
                  <Card.Header>Status</Card.Header>
                  <p>Approval: True</p>
                  <p>Completed: False</p>
                  <div className="ui two buttons">
                    <Button basic color="green" onClick={this.handleApproval}>
                      Approve
                    </Button>
                    <Button basic color="red" onClick={this.handleComplete}>
                      Complete
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default withRouter(GoalieDetails);
