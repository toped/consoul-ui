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
        anonymousUser
      }
      game {
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
export const GAME = gql`
  query game($game: String) {
    game(title: $game)
  }
`
export const CATEGORIES = gql`
  query games {
    games{
      title
      description
      imgSrc
      order
      requirements {
        minPlayers
      }
      setupOptions {
        rounds
        maxPlayers
        timeLimit
      }
    }
  }
`