import { Link, Navigate, Outlet } from "react-router-dom";
import { ADMIN_USER } from "../../../config";
import { useState } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import "./style.css";
import { FiMenu } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdSubject } from "react-icons/md";
import { TbMilitaryRank } from "react-icons/tb";
import { AdminContextProvider } from "../../../context/AdminContextProvider";
import useUser from "../../../context/UserContextProvider";
import logo from "../../../img/company-logo.png";

function AdminHome() {
  const [navOpen, setNavOpen] = useState(true);

  const { state, logout } = useUser();

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  if (!state?.user_id) return <Navigate to="/admin/login" />;

  if (!state?.user_id || state?.role > ADMIN_USER)
    return <Navigate to="/admin/login?error=unauthorized" />;

  return (
    <AdminContextProvider>
      <Container fluid className="px-0">
        <div
          className={`${navOpen ? "active" : ""} bg-primary admin--sidebar `}
        >
        <div className="text-center logo-container">
          <img
            src={logo}
            alt="company_logo"
            width="120px"
            className="my-2 logo"
          />
          <p className="logo-subtitle">Learning Management System</p>
        </div>
          <Nav activeKey="#" className="flex-column mt-5">
            <Nav.Item>
              <Link to="/admin">
                <Nav.Link as="li" className="link-light">
                  <AiOutlineDashboard className="fs-3 me-2" />Dashboard
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="students">
                <Nav.Link as="li" className="link-light">
                  <ImProfile className="fs-3 me-2" />Students
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="teachers">
                <Nav.Link as="li" className="link-light">
                  <FaChalkboardTeacher className="fs-3 me-2" />Teachers
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="subjects">
                <Nav.Link as="li" className="link-light">
                  <MdSubject className="fs-3 me-2" />Subjects
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="grade_levels">
                <Nav.Link as="li" className="link-light">
                  <TbMilitaryRank className="fs-3 me-2" />Grade Levels
                </Nav.Link>
              </Link>
            </Nav.Item>
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
              onClick={handleLogout}
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
