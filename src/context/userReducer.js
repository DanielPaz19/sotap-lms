export const initialState = {
  id: null,
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
      return {
        ...state,
        ...payload.value,
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
