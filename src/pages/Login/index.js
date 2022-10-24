import logo from "../../img/company-logo.png";
import "./style.css";
import { Outlet } from "react-router-dom";

export default function Login({ onSubmit }) {
  return (
    <div id="loginBackground">
      <div className="container p-0">
        <div className="row" style={{ height: "100vh" }}>
          <div className="col-md-7 text-center d-none d-md-block position-relative">
            <div className="position-absolute top-50 start-50 translate-middle w-100">
              <img src={logo} alt="" id="logo" />
              <h1 className="school-name fs-1">
                School of Thougths and Principles
              </h1>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
