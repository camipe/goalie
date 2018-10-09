import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Link } from '../routes';
import GoalieFactory from '../ethereum/factory';
import Goalie from '../ethereum/goalie';
import Layout from '../components/Layout';

const propTypes = {
  goalies: PropTypes.arrayOf(PropTypes.object),
};

class GoalieIndex extends Component {
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

  static defaultProps = {
    goalies: [],
  }

  renderList() {
    const { goalies } = this.props;

    const items = goalies.map(goalie => (
      {
        header: goalie.details.title,
        meta: `deployed at ${goalie.address}`,
        description: (
          <div>
            {goalie.details.description}
          </div>
        ),
        extra: (
          <Link route="/#">
            <a>View details</a>
          </Link>
        ),
        fluid: true,
      }
    ));


    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>{ this.renderList()}</div>
      </Layout>
    );
  }
}

GoalieIndex.propTypes = propTypes;

export default withRouter(GoalieIndex);
