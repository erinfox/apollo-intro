import React from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';

const ALL_LIFTS_QUERY = gql`
  query {
    allLifts {
      name
      id
      status
      capacity
      trailAccess {
        id
        name
      }
    }
  }
`;

const LIFT_STATUS_MUTATION = gql`
  mutation($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      id
      name
      status
    }
  }
`;

const App = () => (
  <Query query={ALL_LIFTS_QUERY}>
    {({ loading, data }) => {
      if (loading) return <div>Loading...</div>;
      return (
        <section>
          {!loading &&
            data.allLifts.map(lift => (
              <div key={lift.id}>
                <h3>
                  {lift.name} {lift.status}
                </h3>
                <Mutation mutation={LIFT_STATUS_MUTATION}>
                  {changeStatus => (
                    <button
                      onClick={() =>
                        changeStatus({
                          variables: { id: lift.id, status: 'OPEN' },
                        })
                      }
                    >
                      OPEN
                    </button>
                  )}
                </Mutation>
                <Mutation mutation={LIFT_STATUS_MUTATION}>
                  {changeStatus => (
                    <button
                      onClick={() =>
                        changeStatus({
                          variables: { id: lift.id, status: 'CLOSED' },
                        })
                      }
                    >
                      CLOSED
                    </button>
                  )}
                </Mutation>
                <Mutation mutation={LIFT_STATUS_MUTATION}>
                  {changeStatus => (
                    <button
                      onClick={() =>
                        changeStatus({
                          variables: { id: lift.id, status: 'HOLD' },
                        })
                      }
                    >
                      HOLD
                    </button>
                  )}
                </Mutation>
                <h4>Trails</h4>
                <ul>
                  {lift.trailAccess.map(trail => (
                    <li key={trail.id}> {trail.name}</li>
                  ))}
                </ul>
              </div>
            ))}
        </section>
      );
    }}
  </Query>
);

export default App;
