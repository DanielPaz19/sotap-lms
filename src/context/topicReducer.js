export const initialState = {
  topics: [],
  loading: false,
};

const topicReducer = (state, action) => {
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
        loading: false,
        topics: payload.value,
      };

    case "END_REQUEST":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default topicReducer;
