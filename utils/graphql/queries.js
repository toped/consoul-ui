import gql from 'graphql-tag'

export const ROOMS = gql`
  query rooms($id: ID, $host: String, $playerUid: ID, $slug: String) {
    rooms(id: $id, host: $host, playerUid: $playerUid, slug: $slug){
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