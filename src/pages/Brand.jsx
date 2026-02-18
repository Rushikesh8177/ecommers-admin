import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { createBrand, deleteBrand, getAllBrands, updateBrand } from '../api/Taskapi';
import DeleteProductModal from '../components/DeleteProductModal';
import EditBrandForm from '../components/brandeditupdate/EditBrandForm';
import AddBrandModal from '../components/brandeditupdate/AddBrandModal';

const Brand = () => {
  const [brand, setBrand] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // ✅ Decode token to check admin role
  const token = localStorage.getItem("token");
  let isAdmin = false;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.urole === "admin";
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  // ✅ Fetch all brands
  async function fetchData() {
    try {
      const response = await getAllBrands();
      if (response.data.success) {
        setBrand(response.data.brands);
      }
    } catch (error) {
      console.error("Error fetching brands", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // ---------- Delete Modal ----------
  const handleDeleteClick = (task) => {
    setSelectedProduct(task);
    setShowModal(true);
  };

  const handleDeleteBrand = async (id) => {
    try {
      const response = await deleteBrand(id);
      if (response.data.success) {
        alert(response.data.msg);
      } else {
        alert("Error deleting brand");
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      alert("Unauthorized or server error");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // ---------- Update Brand ----------
  const handleUpdateBrand = async (id, form) => {
    try {
      const response = await updateBrand(id, form);
      if (response.data.success) {
        alert(response.data.msg);
        fetchData();
      } else {
        alert("Error updating brand");
      }
      setEditingBrand(null);
    } catch (error) {
      alert("Unauthorized or server error");
    }
  };

  // ---------- Add Brand ----------
  const handleAddBrand = async (form) => {
    try {
      const response = await createBrand(form);
      if (response.data.success) {
        alert(response.data.msg);
        fetchData();
      } else {
        alert("Error adding brand");
      }
      setShowAddModal(false);
    } catch (error) {
      alert("Unauthorized or server error");
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Brand List</h2>

        {/* ✅ Add Button visible only for admins */}
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            + Add Brand
          </button>
        )}
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Brand Name</th>
            <th>Brand Image</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {brand.length > 0 ? (
            brand.map((task, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{task.bName}</td>
                <td>
                  <img
                    src={task.bImage}
                    alt={task.bName}
                    className="img-fluid"
                    style={{ width: "40px", height: "30px" }}
                  />
                </td>

                {/* ✅ Only admin sees Edit/Delete */}
                {isAdmin && (
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => setEditingBrand(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteClick(task)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={isAdmin ? "4" : "3"} className="text-center">
                No brands available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Delete Modal (Admin Only) */}
      {isAdmin && (
        <DeleteProductModal
          show={showModal}
          handleClose={handleCloseModal}
          handleDelete={handleDeleteBrand}
          product={selectedProduct}
        />
      )}

      {/* ✅ Edit Modal (Admin Only) */}
      {isAdmin && editingBrand && (
        <EditBrandForm
          show={!!editingBrand}
          brand={editingBrand}
          onSave={handleUpdateBrand}
          onCancel={() => setEditingBrand(null)}
        />
      )}

      {/* ✅ Add Modal (Admin Only) */}
      {isAdmin && (
        <AddBrandModal
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          handleAdd={handleAddBrand}
        />
      )}
    </div>
  );
};

export default Brand;
