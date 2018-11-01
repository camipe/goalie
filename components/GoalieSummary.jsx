import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { Link } from '../routes';

const propTypes = {
  address: PropTypes.string.isRequired,
  details: PropTypes.objectOf(PropTypes.any).isRequired,
};

const GoalieSummary = (props) => {
  const { address, details } = props;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{details.title}</Card.Header>
        <Card.Meta>{`Status: ${details.complete ? 'Completed' : 'Active'}`}</Card.Meta>
        <Card.Description>
          {details.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link route={`/details/${address}`}>
          <a>View details</a>
        </Link>
      </Card.Content>
    </Card>
  );
};

GoalieSummary.propTypes = propTypes;

export default GoalieSummary;
