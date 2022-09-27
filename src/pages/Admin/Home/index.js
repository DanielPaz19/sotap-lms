import { Navigate } from "react-router-dom";
import useLogInStatus from "../../../customHooks/useLoginStatus";
import { ADMIN_USER } from "../../../config";

function AdminHome() {
  const user = useLogInStatus();

  if (!user) return <h1>Loading...</h1>;

  if (!user.id || user.role > ADMIN_USER)
    return <Navigate to="/admin/login?error=unauthorized" />;

  return <h1>Welcome {user?.username}</h1>;
}

export default AdminHome;
