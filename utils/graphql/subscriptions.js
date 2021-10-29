import gql from 'graphql-tag'

export const ROOM_SUBSCRIPTION = gql`
  subscription roomUpdated($slug: String!){
    roomUpdated(slug: $slug){
      id
      host
      slug
      settings {
        timeLimit
        maxPlayers
        rounds
      }
    }
  }
`