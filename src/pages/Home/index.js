import "./style.css";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [open, setOpen] = useState(true);

  const toggleNav = (e) => {
    if (e.target.closest(".btnToggleNav")) return setOpen(!open);
  };

  return (
    <>
      <Nav user_type={3} onClick={toggleNav} open={open} />
      <div className="main">
        <Header title={""} user_type={3} toggleNav={toggleNav} />
        <div className="content container-fluid">
          <div className="container px-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
