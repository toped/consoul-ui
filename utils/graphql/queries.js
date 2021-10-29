import gql from 'graphql-tag'

export const ROOMS = gql`
  query rooms($id: ID, $host: String, $slug: String) {
    rooms(id: $id, host: $host, slug: $slug){
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