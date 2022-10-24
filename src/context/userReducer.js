export const initialState = {
  loading: false,
  error: "",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REQUESTED":
      return {
        ...state,
        loading: true,
      };

    case "UPDATE_DATA":
      console.log(payload);
      return {
        ...state,
        ...payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
