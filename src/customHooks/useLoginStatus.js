import { useEffect, useState } from "react";

function useLogInStatus() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });

        const data = await response.json();

        return setUser((prev) => ({
          ...prev,
          id: data.id,
          username: data.username,
          role: data.role,
        }));
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  return error ? { id: null } : user;
}

export default useLogInStatus;
