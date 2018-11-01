import React from 'react';
import {
  Grid, Card, Header,
} from 'semantic-ui-react';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import GoalieForm from '../../components/GoalieForm';

const GoalieNew = () => (
  <Layout>
    <Grid>
      <Grid.Row columns="2">
        <Grid.Column width="11">
          <GoalieForm />
        </Grid.Column>
        <Grid.Column width="5">
          <Card fluid>
            <Card.Content>
              <Card.Header>Required input</Card.Header>
              <Card.Description>
                <Header sub>Title:</Header>
                  The title of your goal.
                <Header sub>Description:</Header>
                  A short description of your goal.
                <Header sub>Beneficiary:</Header>
                  The address of a beneficiary who will recieve the funds if the is unapproved.
                <Header sub>Friend:</Header>
                  Enter the address of a trusted friend who will judge and approve the goal.
                <Header sub>Deadline:</Header>
                  A deadline for the goal.
                <Header sub>Amount:</Header>
                  The amount of ether you want to stake. Minimum is 0.001 ether.
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Layout>
);
// class GoalieNew extends Component {
//   render() {
//     return (
//     );
//   }
// }

export default withRouter(GoalieNew);
