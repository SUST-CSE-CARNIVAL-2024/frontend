export const initialState = {
  user: "",
  password: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.password,
      };

    default:
      return state;
  }
};
