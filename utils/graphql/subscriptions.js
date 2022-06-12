import gql from 'graphql-tag'

export const ROOM_SUBSCRIPTION = gql`
  subscription roomUpdated($slug: String!){
    roomUpdated(slug: $slug){
      id
      host
      slug
      started
      players{
        displayName
        email
        photoURL
        phoneNumber
        uid
        isHost
        anonymousUser
      }
      game {
        rounds
        timeLimit
        currentRound
        currentTurn
        countDownTime
        roundTime
        roundTimeElapsed
        gameOver
        cards {
          user
          text
          revealed
          highlighted
          selected
        }
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
      slug
    }
  }
`


