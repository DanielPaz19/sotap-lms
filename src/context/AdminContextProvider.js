import { createContext } from "react";
import { API_URL } from "../config";

export const AdminContext = createContext();

function AdminContextProvider({ children }) {
  const adminMethods = {
    async addData(type, data) {
      await fetch(API_URL + `/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
    },
  };

  return (
    <AdminContext.Provider value={adminMethods}>
      {children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider;
