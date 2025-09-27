import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light"
        style={{ width: "250px", height: "100vh" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <span className="fs-4">MyApp</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="category" className="nav-link " aria-current="page">
              Category
            </Link>
          </li>
          <li>
            <Link to="brand" className="nav-link text-dark">
              Brand
            </Link>
          </li>
          <li>
            <Link to="products" className="nav-link text-dark">
              Products
            </Link>
          </li>
        </ul>
        <hr />
        <div>
          <Link to="#" className="d-flex align-items-center text-dark text-decoration-none">
            <strong>Logout</strong>
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default Sidebar;
