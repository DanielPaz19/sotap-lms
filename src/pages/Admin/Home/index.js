import { Navigate } from "react-router-dom";
import useLogInStatus from "../../../customHooks/useLoginStatus";
import { ADMIN_USER } from "../../../config";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./style.css";
import { FiMenu } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";

function AdminHome() {
  const [navOpen, setNavOpen] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);

  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setLoggedOut(true);
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const user = useLogInStatus();

  if (loggedOut) return <Navigate to="/admin/login" />;

  if (!user) return <h1>Loading...</h1>;

  if (!user.id || user.role > ADMIN_USER)
    return <Navigate to="/admin/login?error=unauthorized" />;

  return (
    <Container fluid className="px-0">
      <div
        className={`${navOpen ? "active" : ""} bg-primary admin--sidebar `}
      ></div>

      <div className="bg-light admin--content">
        <div className="admin--header d-md-flex justify-content-between ">
          <Button
            onClick={toggleNav}
            className="px-2 m-2 py-0 fs-4 admin--nav__toggle btn-primary"
          >
            <FiMenu />
          </Button>
          <span
            className="admin--logout link-danger align-self-center me-3"
            onClick={logout}
          >
            <IoExitOutline className="fs-4 me-2" />
            Logout
          </span>
        </div>
      </div>
    </Container>
  );
}

export default AdminHome;
