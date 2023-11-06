/* eslint-disable no-unused-vars */

export const initialState = {
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        user: null,
      };
    default:
      return state;
  }
};
export default userReducer;
