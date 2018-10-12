import React, { Component } from 'react';
import {
  Card,
  Grid,
  Checkbox,
  Form,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Link } from '../routes';
import GoalieFactory from '../ethereum/factory';
import Goalie from '../ethereum/goalie';
import Layout from '../components/Layout';

const propTypes = {
  goalies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class GoalieIndex extends Component {
  state = {
    filterOwn: false,
    filterFriends: false,
    filterBeneficiary: false,
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

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  renderList() {
    const { goalies } = this.props;

    const items = goalies.map(goalie => (
      {
        key: goalie.address,
        header: goalie.details.title,
        meta: `deployed at ${goalie.address}`,
        description: (
          <div>
            {goalie.details.description}
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
    const { filterOwn, filterFriends, filterBeneficiary } = this.state;

    return (
      <Layout>
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column width="12">
              { this.renderList()}
            </Grid.Column>
            <Grid.Column width="4">
              <Card>
                <Card.Content>
                  <Card.Header>Settings</Card.Header>
                  <Card.Meta>Filter the list of Goalies</Card.Meta>
                  <Card.Description>
                    <Form>
                      <Form.Field>
                        <Checkbox
                          toggle
                          name="filterOwn"
                          label="My Goalies"
                          value={!filterOwn}
                          checked={filterOwn === true}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox
                          toggle
                          name="filterFriends"
                          label="Friends' Goalies"
                          value={!filterFriends}
                          checked={filterFriends === true}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Checkbox
                          toggle
                          name="filterBeneficiary"
                          label="Benficiary Goalies"
                          value={filterBeneficiary}
                          checked={filterBeneficiary}
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
