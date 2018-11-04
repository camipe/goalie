import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Button, Message,
} from 'semantic-ui-react';
import GoalieStatus from './GoalieStatus';

const propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  role: PropTypes.string.isRequired,
  loadingApprove: PropTypes.bool.isRequired,
  loadingComplete: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleApproval: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
};

/**
 * GoalieMenu renders a menu where the user can see goalie status and
 * click on buttons to approve or complete the goalie.
 */
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

  // check deadline and statuses to determine if approve button should be disabled
  let disableApproval;
  if (details.approval || details.complete) {
    disableApproval = true;
  } else {
    disableApproval = false;
  }

  // check deadline and statuses if complete button should be disabled
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
        <GoalieStatus approval={details.approval} complete={details.complete} />
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

export default GoalieMenu;
