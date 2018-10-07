import React, { Component } from 'react';
import PropTypes from 'prop-types';
import goalieFactory from '../ethereum/factory';

const propTypes = {
  goalieAddresses: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  goalieAddresses: [],
};

class GoalieIndex extends Component {
  static async getInitialProps() {
    const goalieAddresses = await goalieFactory.methods.getGoalies().call();

    return { goalieAddresses };
  }

  static defaultProps = {
    goalieAddresses: [],
  }

  renderList() {
    const { goalieAddresses } = this.props;

    const addresses = goalieAddresses.map(address => <p key={address}>{address}</p>);

    return addresses;
  }

  render() {
    return (
      <div>{ this.renderList()}</div>
    );
  }
}

GoalieIndex.propTypes = propTypes;
GoalieIndex.defaultProps = defaultProps;

export default GoalieIndex;
