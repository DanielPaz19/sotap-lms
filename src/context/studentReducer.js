export const initialState = {
  subjects: [],
  grade_level: [],
  loading: false,
  error: "",
};

const studentReducer = (state, action) => {
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
        [payload.key]: payload.value,
        loading: false,
      };

    default:
      return state;
  }
};

export default studentReducer;
