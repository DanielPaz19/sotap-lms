export const initialState = {
  student: [],
  subjects: [],
  topics: [],
  grade_level: [],
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
        [payload.key]: payload.value,
        loading: false,
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
