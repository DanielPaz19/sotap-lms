export const initialState = {
  grade_levels: [],
  subjects: [],
  loading: false,
  error: "",
};

export const REQUESTED = "REQUESTED";

const teacherReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case REQUESTED:
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

    case "ERROR_REQUEST":
      return {
        ...state,
        loading: false,
        error: payload.value,
      };

    default:
      throw new Error(`Action ${type} Not Found!`);
  }
};

export default teacherReducer;
