import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const ALL_LIFTS_QUERY = gql`
  query {
    allLifts {
      id
      name
      status
      capacity
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
              <div>
                <h3>{lift.name}</h3>
              </div>
            ))}
        </section>
      );
    }}
  </Query>
);

export default App;
