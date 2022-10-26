import { useReducer } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { API_URL, HTTP_ACCEPTED, TEACHER_USER } from "../config";
import userReducer, { initialState } from "./userReducer";

export const UserContext = createContext(initialState);

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    updateUser();
  }, []);

  const updateUser = async () => {
    dispatch({ TYPE: "REQUESTED" });

    const res = await fetch(API_URL + "/user", {
      credentials: "include",
    });

    const { data } = await res.json();

    dispatch({
      type: "UPDATE_DATA",
      payload: data[0],
    });
  };

  const login = async (formData) => {
    dispatch({ type: "REQUESTED" });

    const res = await fetch(API_URL + "/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.status === 401) {
      const data = await res.json();

      return dispatch({
        type: "ERROR_REQUEST",
        payload: { value: data.message, status_code: res.status },
      });
    }

    await updateUser();
  };

  const register = async (formData) => {
    dispatch({ type: "REQUESTED" });
    const res = await fetch(
      API_URL +
        `/register/${
          Number(formData.role) === TEACHER_USER ? "teacher" : "student"
        }`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();

    // on request error, cancel request
    if (res.status === 422)
      return dispatch({
        type: "ERROR_REQUEST",
        payload: { value: data.message, status_code: res.status },
      });

    // on correct user info,
    if (res.status === HTTP_ACCEPTED)
      return dispatch({
        type: "ERROR_REQUEST",
        payload: { value: "", status_code: res.status },
      });

    // on success, login the user
    await login(formData);
  };

  const logout = async () => {
    await fetch(API_URL + "/logout", {
      method: "POST",
      credentials: "include",
    });

    dispatch({ type: "RESET_STATE", payload: initialState });
  };

  const value = {
    state,
    login,
    logout,
    register,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within AdminContext");
  }

  return context;
};

export default useUser;
