import gql from 'graphql-tag'

export const CREATE_ROOM = gql`
  mutation createRoom($room: GameRoomInput) {
    createRoom(room: $room){
      id
      slug
    }
  }
`

export const UPDATE_ROOM = gql`
  mutation updateRoom($room: GameRoomInput) {
    updateRoom(room: $room){
      id
      slug
      started
    }
  }
`

export const DELETE_ROOM = gql`
  mutation deleteRoom($host: String) {
    deleteRoom(host: $host)
  }
`