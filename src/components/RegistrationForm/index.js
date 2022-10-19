import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { FaKey, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

function RegistrationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    student_id: 0,
    firstname: "",
    lastname: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    const res = await fetch(API_URL + `/register/student`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.status === 422) setError(data.message);

    setIsLoading(false);
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
            <FloatingLabel label="User ID" className="mb-2 text-secondary">
              <Form.Control
                isInvalid={error ? true : false}
                type="number"
                placeholder="User ID"
                autoComplete="off"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    student_id: e.target.value,
                  }))
                }
              />
            </FloatingLabel>
            <FloatingLabel label="First Name" className="mb-2 text-secondary">
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
            <FloatingLabel label="Last Name" className="mb-2 text-secondary">
              <Form.Control
                isInvalid={error ? true : false}
                type="text"
                placeholder="Last Name"
                autoComplete="off"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastname: e.target.value }))
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
