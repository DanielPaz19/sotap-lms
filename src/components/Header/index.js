import "./style.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";

function Header({ title, user_type, toggleNav }) {
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const [user, setUser] = useState({});

  const getUserName = async (id) => {
    const response = await fetch(`http://localhost:3500/students?id=${id}`);
    const data = await response.json();

    if (data === "") return;

    return setUser(data[0]);
  };

  useEffect(() => {
    (async () => getUserName(localStorage.getItem("student_id")))();
  }, []);

  const toggleDropDown = () => {
    setDropDownIsOpen(!dropDownIsOpen);
    console.log(dropDownIsOpen);
  };

  const setUserType = () => {
    switch (user_type) {
      case 1:
        return "Admin";
      case 2:
        return "Teacher";
      case 3:
        return "Student";

      default:
        return;
    }
  };

  const logoutUser = () => {
    // Destroy LocalStorage ID
    localStorage.clear();
    // Route to Login
    window.location.pathname = "/login";
  };

  return (
    <header
      className="d-flex align-items-center justify-content-between"
      onClick={toggleNav}
    >
      <span className="fs-4 ms-3 btnToggleNav" id="menu">
        <GiHamburgerMenu />
      </span>
      <div className="ms-md-5 fs-4 text-primary">{title}</div>
      <div className="user d-md-flex d-flex align-items-center">
        <img
          src="https://picsum.photos/200"
          alt=""
          width="45px"
          className="rounded-pill border border-dark me-2"
        />
        <div className="me-3 d-none d-md-block">
          <p className="fs-6 fw-bold text-primary my-0 user-name">
            {user.firstname} {user.lastname}
          </p>
          <p className="user-role my-0">{setUserType()}</p>
        </div>
        <div className="me-3 user-dropdown " onClick={toggleDropDown}>
          <i className="bi bi-chevron-down fs-5"></i>
        </div>
      </div>

      <Collapse in={dropDownIsOpen}>
        <div
          className="bg-white position-absolute end-0 top-100 me-1 me-md-2 mt-1 shadow"
          id="accountDropDown"
        >
          <div className="text-center fw-bold text-primary mt-1  d-block d-md-none">
            {user.firstname} {user.lastname}
            <hr />
          </div>
          <div className="pb-3 pt-md-3 fs-6 text-center" onClick={logoutUser}>
            <ImExit /> Logout
          </div>
        </div>
      </Collapse>
    </header>
  );
}

export default Header;
