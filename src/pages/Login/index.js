import logo from "../../img/company-logo.png";
import "./style.css";
import { FaUser, FaKey } from "react-icons/fa";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState(null);

  const checkUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3500/users?username=${formData.username}&password=${formData.password}`
      );

      const data = await response.json();

      if (data === "") return;

      const student_id = data[0].student_id;

      localStorage.setItem("student_id", student_id);

      return student_id;
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    (await checkUser())
      ? (window.location.pathname = "/")
      : (window.location.pathname = "/login");
  };

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
          <div className="col-md-5 col-12 position-relative">
            <div className="login mx-auto position-absolute top-50 start-50 translate-middle">
              <div className="text-center">
                <h2 className="loginTxt">Login</h2>
                <form action="" onSubmit={submitForm}>
                  <div className="container">
                    <div className="fontuser position-relative">
                      <span className="position-absolute top-50 translate-middle ms-4">
                        <FaUser />
                      </span>
                      <input
                        autoComplete="false"
                        type="text"
                        placeholder="User ID"
                        name="uname"
                        required
                        id="inputUsername"
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                      />
                    </div>

                    <div className="fontpassword position-relative">
                      <span className="position-absolute top-50 translate-middle ms-4">
                        <FaKey />
                      </span>
                      <input
                        autoComplete="false"
                        type="password"
                        placeholder="Password"
                        name="psw"
                        id="inputPassword"
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                    <button className="loginBtn btn" type="submit">
                      Login
                    </button>
                    <h4 className="registerBtn btn">Register</h4>
                  </div>
                  {/* <input type="text" class="my-1" placeholder="User ID">
              <input type="text" class="my-1" placeholder="Password">  */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
