export const initialState = {
  student: [],
  subjects: [],
  topics: [],
  loading: false,
  error: "",
};

const gradeReducer = (state, action) => {
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
        [payload.key]: payload.value,
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

export default gradeReducer;
