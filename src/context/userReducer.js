export const initialState = {
  loading: false,
  error: "",
  status_code: null,
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
        ...payload,
        loading: false,
      };

    case "RESET_STATE":
      return {
        ...payload,
      };

    case "ERROR_REQUEST":
      return {
        ...state,
        error: payload.value,
        loading: false,
        status_code: payload.status_code,
      };

    default:
      return state;
  }
};

export default userReducer;
