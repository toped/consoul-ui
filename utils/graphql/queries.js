import gql from 'graphql-tag'

export const ROOMS = gql`
  query rooms($id: ID, $host: String, $playerUid: ID, $slug: String) {
    rooms(id: $id, host: $host, playerUid: $playerUid, slug: $slug){
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
      }
      settings {
        timeLimit
        maxPlayers
        rounds
      }
    }
  }
`
export const CATEGORY = gql`
  query category($category: String) {
    category(title: $category)
  }
`
export const CATEGORIES = gql`
  query categories {
    categories{
      title
      description
      imgSrc
      order
    }
  }
`