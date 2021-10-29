import gql from 'graphql-tag'

subscription($repoName: String!){
  roomUpdated(repoFullName: $repoName) {
    id
    content
  }
}