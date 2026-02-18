import React, { useState } from "react";
import { registerUser } from "../api/Taskapi";

const Register = () => {
  const [form, setForm] = useState({
    uname: "",
    uemail: "",
    umobileNumber: "",
    upassword: "",
    urole: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      if (res.data.success) {
        alert("Registration successful!");
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      console.error(err);
      alert("Error registering user");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input name="uname" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="uemail" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Mobile Number</label>
          <input name="umobileNumber" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="upassword" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select name="urole" className="form-control" onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
