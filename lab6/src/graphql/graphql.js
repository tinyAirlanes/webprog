import gql from 'graphql-tag'

export const CHECK_USERNAME = gql`query checkUsername($username:String!) {
    exists: usernameExists(username: $username)}
    `;

export const REGISTER = gql`query register($username:String!,$password:String!) {
    register(username: $username, password: $password) {
      id
      username
      timestamp
    }
  }
  `;

export const LOGIN = gql`query login($username:String!,$password:String!) {
    token: login(username: $username, password: $password) 
  }
  `;

export const USER_INFO = gql`  query me {
    me {
      id
      username
      timestamp
      rooms{
        id
        name
      }
      currentRoom {
        id
        name   
        owner {
          id
          username
        }
        members{
            id
            username
          }
        lastMessages{
          id
          timestamp
       
          author{
            id 
            username
          }
          text
        }
      }
    }
  }`
export const GET_ROOMS = gql`query rooms {
  rooms {
    id
    name
    owner {
      id
      username
    }
  }
}`
export const ALL_USERS = gql`query users {
  users {
    id
    username
    currentRoom {
      name
    }
    rooms {
      name
    }
  }
}`

export const CREATE_ROOM = gql`mutation createRoom($room_name:String!) {
    createRoom(name: $room_name) {
      id
      name
      timestamp
    }
  }`

export const UPDATE_ROOM = gql`mutation updateRoom($name:String!,$id:ID!) {
    updateRoom(id: $id, name: $name) {
      id 
      name
      timestamp
    }
  }`

export const DELETE_ROOM = gql`mutation deleteRoom($id:ID!) {
    deleteRoom(id: $id) {
      id 
      name
      timestamp
    }
  }`

export const JOIN_ROOM = gql`mutation join($id:ID!) {
    joinRoom(roomId: $id) {
      id
      name   
      owner {
        id
        username
      }
      members{
          id
          username
        }
      lastMessages{
        id
        timestamp
     
        author{
          id 
          username
        }
        text
      }
    }
  }`

export const LEAVE_ROOM = gql`mutation leave {
    leaveCurrentRoom {
      id 
      name
    }
  }`

export const CREATE_MESSAGE = gql`mutation createMessage($message:String!) {
  createMessage(text: $message) {
    id
    timestamp
    author {id username }
    text
  }
}`

export const SUB_ROOM_CREATED = gql`
subscription roomCreated {
  roomCreated {
    id name owner {id username}
  }
}`

export const SUB_ROOM_UPDATED = gql`
subscription roomUpdated {
  roomUpdated {
    id name owner {id username}
  }
}`

export const SUB_ROOM_DELETED = gql`
subscription roomDeleted {
  roomDeleted {
    id name owner {id username}
  }
}`

export const SUB_ROOM_CHANGED = gql`
subscription currentRoomChanged {
  currentRoomChanged {
    currentRoom { id name }
  }
}`

export const SUB_MEMBER_JOINED = gql`
subscription memberJoined {
  memberJoined { id username }
}`

export const SUB_MEMBER_LEFT = gql`
subscription memberLeft {
  memberLeft { id username }
}`

export const SUB_MESSAGE_CREATED = gql`
subscription messageCreated {
  messageCreated {
    id
    timestamp
    author { id username }
    text
  }
}`



