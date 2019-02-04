import { ADD_USER, UPDATE_USER, QUEUE_USER, DEQUEUE_USER } from "./constants";

const initialState = {
  users: [],
  groups: ['Programmer', 'Scientiest'],
  unRegisteredChanges: [],
};

function users(state = initialState, action) {
  if (action.type === ADD_USER) {
    const { userData } = action.payload;
    return {
      ...state,
      users: [
        ...state.users,
        userData
      ]
    };
  }

  if (action.type === UPDATE_USER) {
    const { userData, code } = action.payload;
    return {
      ...state,
      users: state.users.map(user => user.code === code ? {...user, ...userData} : user)
    };
  }

  if (action.type === QUEUE_USER) {
    const { userData, code } = action.payload;
    return {
      ...state,
      unRegisteredChanges: [
        ...state.unRegisteredChanges,
        {...userData, code}
      ]
    };
  }

  if (action.type === DEQUEUE_USER) {
    const { userData, code } = action.payload;
    return {
      ...state,
      unRegisteredChanges: state.unRegisteredChanges.filter(user => user.code !== code),
      users: state.users.map(user => user.code === code ? {...user, ...userData} : user)
    };
  }

  return state;
}
  
module.exports = users;