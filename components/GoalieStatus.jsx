import React from 'react';
import PropTypes from 'prop-types';
import {
  Statistic,
  Icon,
} from 'semantic-ui-react';

const propTypes = {
  approval: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
};

/**
 * GoalieStatus renders the approval and completed status with some nice icons.
 */
const GoalieStatus = (props) => {
  const { approval, complete } = props;

  return (
    <Statistic.Group size="small" widths="two" style={{ paddingTop: '0.5em', paddingBottom: '1em' }}>
      <Statistic color={approval ? 'green' : 'red'}>
        <Statistic.Value>
          {approval ? <Icon name="checkmark" /> : <Icon name="delete" />}
        </Statistic.Value>
        <Statistic.Label>Approved</Statistic.Label>
      </Statistic>
      <Statistic color={complete ? 'green' : 'red'}>
        <Statistic.Value>
          {complete ? <Icon name="checkmark" /> : <Icon name="delete" />}
        </Statistic.Value>
        <Statistic.Label>Completed</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  );
};

GoalieStatus.propTypes = propTypes;

export default GoalieStatus;
