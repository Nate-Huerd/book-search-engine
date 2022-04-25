import gql from "graphql-tag";

// me (user). id, email, username.
export const GET_ME = gql`
  {
    me {
      _id
      email
      username
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;