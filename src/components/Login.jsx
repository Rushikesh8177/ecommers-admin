import React, { useState } from "react";
import { loginUser } from "../api/Taskapi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ uemail: "", upassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login successful!");
        navigate("/brand");
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input name="uemail" type="email" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input name="upassword" type="password" className="form-control" onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
