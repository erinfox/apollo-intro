import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://snowtooth.moonhighway.com',
});

const mutation = gql`
  mutation {
    setLiftStatus(id: "panorama", status: OPEN) {
      name
      status
    }
  }
`;

client.mutate({ mutation }).then(console.log);

const query = gql`
  query {
    allLifts {
      name
    }
  }
`;

// client.query({ query }).then(result => {
//   let liftNames = result.data.allLifts.map(lift => lift.name);
//   let root = document.getElementById('root');
//   root.innterHTML = liftNames;
// });

const getLifts = async () => {
  // sends the mutation query ---------------------------------------------------------------
  const { data } = await client.query({ query });
  //write to the cache ---------------------------------------------------------------
  client.writeQuery({
    query,
    data: {
      allLifts: [...data.allLifts, { __typename: 'Lift', name: 'Silverado' }],
    },
  });
  console.log(`cache, ${JSON.stringify(client.cache.data)}`);
  // reads the cache ---------------------------------------------------------------
  let readCache = client.readQuery({ query });
  console.log(`read cache, ${JSON.stringify(readCache)}`);
};

getLifts();
