import { gql } from 'react-apollo';

export default gql`
  query {
    songs {
      id
      title
    }
  }
`;
