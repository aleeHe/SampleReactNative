import { ADD_USER, UPDATE_USER } from "./constants";

const initialState = {
  users: [],
  groups: ['Programmer', 'Scientiest'],
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
    const { userData } = action.payload;
    const userIndex = state.users.map(user => user.code).indexOf(userData.code);
    return {
      ...state,
      users: state.users.map((user, i) => i === userIndex ? userData : user)
    };
  }

  return state;
}
  
module.exports = users;