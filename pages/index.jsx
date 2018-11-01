import React, { Component } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Form,
  Grid,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Link } from '../routes';
import web3 from '../ethereum/web3';
import GoalieFactory from '../ethereum/factory';
import Goalie from '../ethereum/goalie';
import Layout from '../components/Layout';
import GoalieStatus from '../components/GoalieStatus';

const propTypes = {
  goalies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class GoalieIndex extends Component {
  state = {
    filterRole: 'all',
    filteredGoalies: [],
  }

  static async getInitialProps() {
    const goalieAddresses = await GoalieFactory.methods.getGoalies().call();

    const goalies = await Promise.all(
      goalieAddresses
        .map(address => Goalie(address))
        .map(async (goalieInstance) => {
          const details = await goalieInstance.methods.details().call();
          return { address: goalieInstance.options.address, details };
        }),
    );

    return { goalies };
  }

  async componentDidMount() {
    const userAddresses = await web3.eth.getAccounts();
    const { goalies } = this.props;

    this.setState({ userAddresses, filteredGoalies: goalies });
  }

  handleChange = (e, { value }) => {
    const { userAddresses } = this.state;

    this.setState({ filterRole: value });
    this.filterGoalies(userAddresses[0], value);
  }

  filterGoalies = (userAddress, filterRole) => {
    const { goalies } = this.props;
    if (filterRole === 'all') {
      this.setState({ filteredGoalies: goalies });
    } else {
      const filteredGoalies = goalies.filter(goalie => userAddress === goalie.details[filterRole]);
      this.setState({ filteredGoalies });
    }
  }

  renderList() {
    const { filteredGoalies } = this.state;
    const { goalies } = this.props;

    const list = filteredGoalies || goalies;
    const items = list.map(goalie => (
      {
        key: goalie.address,
        header: goalie.details.title,
        meta: `deployed at ${goalie.address}`,
        description: (
          <div>
            <div style={{ marginBottom: '1em' }}>
              {goalie.details.description}
            </div>
            <GoalieStatus approval={goalie.details.approval} complete={goalie.details.complete} />
          </div>
        ),
        extra: (
          <Link route={`/details/${goalie.address}`}>
            <a>View details</a>
          </Link>
        ),
        fluid: true,
      }
    ));


    return <Card.Group items={items} />;
  }

  render() {
    const { filterRole, filteredGoalies } = this.state;

    return (
      <Layout>
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column width="12">
              {
                (filteredGoalies && filteredGoalies.length)
                  ? this.renderList()
                  : <span>There are no goalies to display.</span>
              }
            </Grid.Column>
            <Grid.Column width="4">
              <Link route="/new">
                <Button
                  as="a"
                  content="Create Goalie"
                  icon="plus"
                  primary
                  fluid
                />
              </Link>

              <Card>
                <Card.Content>
                  <Card.Header>Settings</Card.Header>
                  <Card.Meta>Filter the list of Goalies</Card.Meta>
                  <Card.Description>
                    <Form>
                      <Form.Field>
                        <Checkbox
                          toggle
                          name="filterAll"
                          label="All Goalies"
                          value="all"
                          checked={filterRole === 'all'}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox
                          toggle
                          name="filterOwn"
                          label="My Goalies"
                          value="owner"
                          checked={filterRole === 'owner'}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox
                          toggle
                          name="filterFriends"
                          label="Friends' Goalies"
                          value="friend"
                          checked={filterRole === 'friend'}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox
                          toggle
                          name="filterBeneficiary"
                          label="Benficiary Goalies"
                          value="beneficiary"
                          checked={filterRole === 'beneficiary'}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Form>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

GoalieIndex.propTypes = propTypes;

export default withRouter(GoalieIndex);
