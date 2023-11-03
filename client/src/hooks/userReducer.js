/* eslint-disable no-unused-vars */

export const initialState = {
  user: null,
};

const userReducer = (action, state) => {
    console.log(action);
  switch (action.type) {
    case "LOGIN_USER":
      return {
        user: action.user,
      };
    case "SIGNUP_USER":
      return {
        user: null,
      };
    default:
      return state;
  }
};
export default userReducer