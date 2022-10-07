import { useReducer } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { API_URL } from "../config";
import adminReducer, { initialState } from "./adminReducer";

export const AdminContext = createContext(initialState);

export function AdminContextProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    updateData("students");
    updateData("teachers");
    updateData("subjects");
    updateData("grade_levels");
  }, []);

  const addData = async (type, data) => {
    dispatch({ type: "REQUESTED" });
    await fetch(API_URL + `/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    await updateData(type);
  };

  const deleteData = async (type, id) => {
    dispatch({ type: "REQUESTED" });
    await fetch(`${API_URL}/${type}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    await updateData(type);
  };

  const updateData = async (data_type) => {
    dispatch({ type: "REQUESTED" });
    const res = await fetch(API_URL + `/${data_type}`, {
      method: "GET",
      credentials: "include",
    });

    const { data } = await res.json();
    dispatch({
      type: "UPDATE_DATA",
      payload: { key: data_type, value: data },
    });
  };

  const value = {
    state,
    addData,
    updateData,
    deleteData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

const useAdmin = () => {
  const context = useContext(AdminContext);

  if (context === undefined) {
    throw new Error("useAdmin must be used within AdminContext");
  }

  return context;
};

export default useAdmin;
