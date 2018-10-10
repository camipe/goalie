import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import {
  Grid,
  Statistic,
  Card,
  Header,
  Button,
  Message,
  Icon,
} from 'semantic-ui-react';
import moment from 'moment';
import { Router } from '../../routes';
import web3 from '../../ethereum/web3';
import Goalie from '../../ethereum/goalie';
import Layout from '../../components/Layout';

class GoalieDetails extends Component {
  state = {
    loadingApprove: false,
    loadingComplete: false,
    errorMessage: '',
  }

  static async getInitialProps(props) {
    const { address } = props.query;

    const goalie = Goalie(address);
    const details = await goalie.methods.details().call();
    const value = 1;

    return { address, details, value };
  }

  static propTypes = {
    details: PropTypes.objectOf(PropTypes.any).isRequired,
    value: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
  }

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
    const { details, value } = this.props;
    const { loadingApprove, loadingComplete, errorMessage } = this.state;
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
                      <Grid.Column width="14">
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
            <Grid.Column width="5">
              <Card fluid>
                <Card.Content extra>
                  <Card.Header>Status</Card.Header>
                  <Statistic.Group size="small" widths="two" style={{ paddingTop: '0.5em', paddingBottom: '1em' }}>
                    <Statistic color={details.approval ? 'green' : 'red'}>
                      <Statistic.Value>
                        {
                          details.approval ? <Icon name="checkmark" /> : <Icon name="delete" />
                        }
                      </Statistic.Value>
                      <Statistic.Label>Approved</Statistic.Label>
                    </Statistic>
                    <Statistic color={details.complete ? 'green' : 'red'}>
                      <Statistic.Value>
                        {
                          details.complete ? <Icon name="checkmark" /> : <Icon name="delete" />
                        }
                      </Statistic.Value>
                      <Statistic.Label>Completed</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
                  <div className="ui two buttons">
                    <Button basic color="green" loading={loadingApprove} onClick={this.handleApproval}>
                      Approve
                    </Button>
                    <Button basic color="red" loading={loadingComplete} onClick={this.handleComplete}>
                      Complete
                    </Button>
                  </div>

                </Card.Content>
                <Message error header="Oops!" size="small" hidden={!errorMessage} content={errorMessage} attached="bottom" />
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default withRouter(GoalieDetails);
