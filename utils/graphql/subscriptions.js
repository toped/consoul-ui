import gql from 'graphql-tag'

export const ROOM_SUBSCRIPTION = gql`
  subscription roomUpdated($slug: String!){
    roomUpdated(slug: $slug){
      id
      host
      slug
      players{
        displayName
        email
        photoURL
        phoneNumber
        uid
        isHost
      }
      settings {
        timeLimit
        maxPlayers
        rounds
      }
    }
  }
`

export const ROOM_DELETED_SUBSCRIPTION = gql`
  subscription roomDeleted($slug: String!){
    roomDeleted(slug: $slug){
      id
    }
  }
`


