import { createContext, useEffect } from "react";
import { useContext, useReducer } from "react";
import { API_URL } from "../config";
import teacherReducer, { initialState, REQUESTED } from "./teacherReducer";
import useUser from "./UserContextProvider";

export const TeacherContext = createContext(initialState);

export function TeacherContextProvider({ children }) {
  const [state, dispatch] = useReducer(teacherReducer, initialState);

  const { state: userState } = useUser();

  useEffect(() => {
    getGradeLevels(userState?.id);
    getSubjects(userState?.id);
  }, [userState?.id]);

  const getGradeLevels = async (teacher_id) => {
    dispatch({ type: REQUESTED });
    try {
      const res = await fetch(API_URL + `/teacher/${teacher_id}/grade_levels`, {
        credentials: "include",
      });

      const { data } = await res.json();

      dispatch({
        type: "UPDATE_DATA",
        payload: { key: "grade_levels", value: data },
      });
    } catch (error) {
      console.log("error getting grade levels");
    }
  };

  const getSubjects = async (teacher_id) => {
    dispatch({ type: REQUESTED });
    const res = await fetch(API_URL + `/teacher/${teacher_id}/subjects`, {
      credentials: "include",
    });

    const { data } = await res.json();

    dispatch({
      type: "UPDATE_DATA",
      payload: { value: data, key: "subjects" },
    });
  };

  const value = {
    state,
    getGradeLevels,
    getSubjects,
  };

  return (
    <TeacherContext.Provider value={value}>{children}</TeacherContext.Provider>
  );
}

const useTeacher = () => {
  const context = useContext(TeacherContext);

  if (context === undefined) {
    throw new Error("useTeacher must be used within TeacherContext");
  }

  return context;
};

export default useTeacher;
