import React from 'react';
import PropTypes from 'prop-types';
import {
  Statistic,
  Card,
  Button,
  Message,
  Icon,
} from 'semantic-ui-react';

const propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  role: PropTypes.string,
  loadingApprove: PropTypes.bool.isRequired,
  loadingComplete: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleApproval: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
};

const defaultProps = {
  role: '',
};

const GoalieMenu = (props) => {
  const {
    details,
    loadingApprove,
    loadingComplete,
    errorMessage,
    handleApproval,
    handleComplete,
    role,
  } = props;

  // check deadline such things to determine if approve button should be disabled
  let disableApproval;
  if (parseInt(details.deadline, 10) * 1000 > new Date().getTime()) {
    if (details.approval || details.complete) {
      disableApproval = true;
    } else {
      disableApproval = false;
    }
  } else {
    disableApproval = true;
  }

  // check deadline such things to determine if complete button should be disabled
  let disableComplete;
  if (parseInt(details.deadline, 10) * 1000 <= new Date().getTime()) {
    if (details.approval || !details.complete) {
      disableComplete = false;
    } else {
      disableComplete = true;
    }
  } else {
    disableComplete = true;
  }

  return (
    <Card fluid>
      <Card.Content extra>
        <Card.Header>Status</Card.Header>
        <Statistic.Group size="small" widths="two" style={{ paddingTop: '0.5em', paddingBottom: '1em' }}>
          <Statistic color={details.approval ? 'green' : 'red'}>
            <Statistic.Value>
              {details.approval ? <Icon name="checkmark" /> : <Icon name="delete" />}
            </Statistic.Value>
            <Statistic.Label>Approved</Statistic.Label>
          </Statistic>
          <Statistic color={details.complete ? 'green' : 'red'}>
            <Statistic.Value>
              {details.complete ? <Icon name="checkmark" /> : <Icon name="delete" />}
            </Statistic.Value>
            <Statistic.Label>Completed</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        {role === 'friend'
          ? (
            <Button fluid color="green" disabled={disableApproval} loading={loadingApprove} onClick={handleApproval} style={{ marginBottom: '0.8em' }}>
              Approve
            </Button>) : null
        }
        {role === 'owner' || role === 'beneficiary'
          ? (
            <Button fluid color="blue" disabled={disableComplete} loading={loadingComplete} onClick={handleComplete}>
              Complete
            </Button>) : null
        }
      </Card.Content>
      <Message error header="Oops!" size="small" hidden={!errorMessage} content={errorMessage} attached="bottom" />
    </Card>
  );
};

GoalieMenu.propTypes = propTypes;
GoalieMenu.defaultProps = defaultProps;

export default GoalieMenu;
