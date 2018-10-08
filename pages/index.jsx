import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
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
        .map(async (goalie) => {
          const details = await goalie.methods.details().call();
          return { address: goalie.options.address, details };
        }),
    );

    return { goalies };
  }

  static defaultProps = {
    goalies: [],
  }

  renderList() {
    const { goalies } = this.props;

    const goalieElements = goalies.map(goalie => (
      <p key={goalie.address}>
        {goalie.details.title}
        <br />
        {goalie.address}
      </p>
    ));

    return goalieElements;
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
