import { useReducer } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import { API_URL } from "../config";
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

      return dispatch({ type: "ERROR_REQUEST", payload: { value: data } });
    }

    await updateUser();
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
