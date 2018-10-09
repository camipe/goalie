import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import web3 from '../../ethereum/web3';
import Goalie from '../../ethereum/goalie';
import Layout from '../../components/Layout';

// 3. presentera datan

class GoalieDetails extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;

    const goalie = Goalie(address);
    const details = await goalie.methods.details().call();

    return { details };
  }

  propTypes = {
    details: PropTypes.objectOf(PropTypes.node).isRequired,
  }

  render() {
    const { details } = this.props;
    console.log(details);
    return (
      <Layout>
        <p>
          Goalie details:
          {details.title}
          <br />
          {details.description}
          <br />
          {details.deadline}
          <br />
          {details.owner}
          <br />
          {details.beneficiary}
          <br />
          {details.friend}
          <br />
        </p>
      </Layout>
    );
  }
}

export default withRouter(GoalieDetails);
