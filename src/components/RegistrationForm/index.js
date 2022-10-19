import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { FaKey, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function RegistrationForm({ onSubmit }) {
  const [formData, setFormData] = useState(null);

  return (
    <div className="col-md-5 col-12 position-relative">
      <div className="login mx-auto position-absolute top-50 start-50 translate-middle">
        <div className="text-center">
          <h2 className="loginTxt">Register</h2>
          <Form className="px-4">
            <FloatingLabel label="User ID" className="mb-2 text-secondary">
              <Form.Control
                type="text"
                placeholder="User ID"
                autoComplete="off"
              />
            </FloatingLabel>
            <FloatingLabel label="First Name" className="mb-2 text-secondary">
              <Form.Control
                type="text"
                placeholder="User ID"
                autoComplete="off"
              />
            </FloatingLabel>
            <FloatingLabel label="Last Name" className="mb-2 text-secondary">
              <Form.Control
                type="text"
                placeholder="User ID"
                autoComplete="off"
              />
            </FloatingLabel>

            <Button
              variant="primary"
              type="submit"
              size="lg"
              className="w-100 mt-3"
            >
              Register
            </Button>
          </Form>
          <div className="mt-2 mb-5">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
