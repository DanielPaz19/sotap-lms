export const initialState = {
  students: [],
  loading: false,
  error: false,
};

const studentReducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING":
      console.log("loading data");
      return {
        ...state,
        loading: true,
      };
    case "DONE_LOADING":
      console.log("finished loading data");

      return {
        ...state,
        loading: false,
      };
    case "ADD_STUDENT":
      return {
        ...state,
        students: action.payload,
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        students: action.payload,
      };

    default:
      return state;
  }
};

export default studentReducer;
