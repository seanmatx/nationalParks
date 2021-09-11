import { gql } from '@apollo/client';

// export const QUERY_USERS = gql`
//   query allUsers {
//     users {
//       _id
//       name
//     }
//   }
// `;

// export const QUERY_SINGLE_USER = gql`
//   query singleUser($userId: ID!) {
//     user(userId: $userId) {
//       _id
//       name
//     }
//   }
// `;

export const QUERY_ME = gql`
{
  me {
    _id
    name
    email
    savedParks {
      _id
      parkId
      parkName
      description
      image
    }
  }
}
`;