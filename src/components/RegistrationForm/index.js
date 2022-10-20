import { useState } from "react";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

function RegistrationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    role: 0,
    user_id: 0,
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userFound, setUserFound] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    const res = await fetch(
      API_URL + `/register/${formData.role === 2 ? "teacher" : "student"}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    setIsLoading(false);

    if (res.status === 422) return setError(data.message);

    setUserFound(true);
  };

  return (
    <div className="col-md-5 col-12 position-relative">
      <div className="login mx-auto position-absolute top-50 start-50 translate-middle">
        <div className="text-center">
          <h2 className="loginTxt">Register</h2>
          <Form
            className="px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              console.log(formData);
            }}
          >
            {userFound ? (
              <>
                <FloatingLabel label="Username" className="mb-2 text-secondary">
                  <Form.Control
                    value={formData.username}
                    isInvalid={error ? true : false}
                    type="text"
                    placeholder="Username"
                    autoComplete="off"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </FloatingLabel>

                <FloatingLabel label="Password" className="mb-2 text-secondary">
                  <Form.Control
                    value={formData.password}
                    isInvalid={error ? true : false}
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </FloatingLabel>
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="w-100 mt-3"
                >
                  {isLoading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Register"
                  )}
                </Button>
              </>
            ) : (
              <>
                <FloatingLabel
                  label="Register as"
                  className="mb-2 text-secondary"
                >
                  <Form.Select
                    required
                    defaultValue=""
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        role: Number(e.target.value),
                      }))
                    }
                  >
                    <option value="">Select one ...</option>
                    <option value="2">Teacher</option>
                    <option value="3">Student</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel label="User ID" className="mb-2 text-secondary">
                  <Form.Control
                    isInvalid={error ? true : false}
                    type="number"
                    placeholder="User ID"
                    autoComplete="off"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        user_id: e.target.value,
                      }))
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  label="First Name"
                  className="mb-2 text-secondary"
                >
                  <Form.Control
                    isInvalid={error ? true : false}
                    type="text"
                    placeholder="First Name"
                    autoComplete="off"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstname: e.target.value,
                      }))
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  label="Last Name"
                  className="mb-2 text-secondary"
                >
                  <Form.Control
                    isInvalid={error ? true : false}
                    type="text"
                    placeholder="Last Name"
                    autoComplete="off"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastname: e.target.value,
                      }))
                    }
                  />
                </FloatingLabel>
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="w-100 mt-3"
                >
                  {isLoading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Next >"
                  )}
                </Button>
              </>
            )}
          </Form>
          <div className="mt-2 mb-5">
            <Link to="/login">Login</Link>
          </div>
          <div className="text-danger mb-3">{error ? error : ""}</div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
