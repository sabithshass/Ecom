import React, { useState } from "react";
import "../style/style.css";
import { Link, useNavigate } from "react-router-dom";
import { Baseurl, signUp } from "../utils/BaseUrl";
import axios from "axios";
import { Show_Toast } from "../utils/Toast";
function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${Baseurl + signUp}`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });


      if (response.status === 200) {
        Show_Toast(response.data.message, true);
        navigate("/login");
      }

    } catch (err) {
      Show_Toast("User already exists", false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100 d-flex align-items-center">
        <div className="col-12 col-md-4 auth-panel left-panel text-center text-light d-flex align-items-center justify-content-center">
          <div className="content">
            <h2>Welcome Back!</h2>
            <p>
              To keep connected with us, please login with your personal info
            </p>
            <Link
              to="/login"
              className="btn btn-outline-light toggle-button rounded-pill"
            >
              SIGN IN
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-8  auth-form d-flex align-items-center justify-content-center">
          <div className="form-content pt-5">
            <h3 className="form-title text-center" style={{ color: "#EDA415" }}>
              Create Account
            </h3>
            <form className="w-100" onSubmit={handleRegister}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Name"
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Password"
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <div className="d-flex justify-content-center pb-5">
                <button
                  type="submit"
                  className="btn btn-warning submit-button w-50 rounded-pill"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "SIGN UP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
