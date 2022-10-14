export const initialState = {
  students: [],
  teachers: [],
  subjects: [],
  grade_levels: [],
  subject_teacher: [],
  loading: false,
  error: "",
};

const adminReducer = (state, action) => {
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

export default adminReducer;
