import { Link, Navigate, Outlet } from "react-router-dom";
import useLogInStatus from "../../../customHooks/useLoginStatus";
import { ADMIN_USER } from "../../../config";
import { useState } from "react";
import {
  Button,
  Container,
  Nav,
  Dropdown,
  NavItem,
  NavLink,
} from "react-bootstrap";
import "./style.css";
import { FiMenu } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";
import { AdminContextProvider } from "../../../context/AdminContextProvider";

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
    <AdminContextProvider>
      <Container fluid className="px-0">
        <div
          className={`${navOpen ? "active" : ""} bg-primary admin--sidebar `}
        >
          <Nav activeKey="#" className="flex-column mt-5">
            <Nav.Item>
              <Link to="/admin">
                <Nav.Link as="li" className="link-light">
                  Dasboard
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="students">
                <Nav.Link as="li" className="link-light">
                  Students
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="teachers">
                <Nav.Link as="li" className="link-light">
                  Teachers
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="subjects">
                <Nav.Link as="li" className="link-light">
                  Subjects
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink} className="link-light">
                Grade Levels
              </Dropdown.Toggle>
              <Dropdown.Menu className="ms-5">
                <Link to="grade_levels/1">
                  <Dropdown.Item as="li">Grade 1</Dropdown.Item>
                </Link>
                <Dropdown.Item as="li">Grade 2</Dropdown.Item>
                <Dropdown.Item as="li">Grade 3</Dropdown.Item>
                <Dropdown.Item as="li">Grade 4</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>

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

          <main className="container mt-3">
            <Outlet />
          </main>
        </div>
      </Container>
    </AdminContextProvider>
  );
}

export default AdminHome;
