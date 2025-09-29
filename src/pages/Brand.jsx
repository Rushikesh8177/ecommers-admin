import React, { useEffect, useState } from 'react'
import { createBrand, deleteBrand, getAllBrands, updateBrand } from '../api/Taskapi';
import DeleteProductModal from '../components/DeleteProductModal';
import EditBrandForm from '../components/brandeditupdate/EditBrandForm';
import AddBrandModal from '../components/brandeditupdate/AddBrandModal';

const Brand = () => {

  const [brand, setbrand] = useState([]);

   const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
  
      const [editingBrand, setEditingBrand] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

  async function fetchData() {
    const response = await getAllBrands();
    console.log(response.data.brands);
    if (response.data.success) {
      setbrand(response.data.brands);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

// ----------handle delete modal-----------------
  const handleDeleteClick = (task) => {
    setSelectedProduct(task);
    setShowModal(true);
  }

  async function handleDeleteCatagory(id) {
      const response = await deleteBrand(id);
      if (response.data.success) {
        alert(response.data.msg)
  
      } else {
        alert("Error deleting product");
      }
      fetchData();
      handleCloseModal();
    }

    const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // ----------handle edit modal-----------------

  const handleUpdateBrand = async (id, form) => {
    const response = await updateBrand(id, form);
    if (response.data.success) {
      alert(response.data.msg);
      fetchData();
    } else {
      alert("Error updating brand");
    }
    setEditingBrand(null);
  };

  // ------------Add Brand -------------
  const handleAddBrand = async (form) => {
    const response = await createBrand(form);
    if (response.data.success) {
      alert(response.data.msg);
      fetchData();
    } else {
      alert("Error adding brand");
    }
    setShowAddModal(false);
  };


  return (

    <div className="container ">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Brand List</h2>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Brand
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task Name</th>
            <th scope="col">Task Stutus</th>
          </tr>
        </thead>
        <tbody>
          {brand.length > 0 ? (
            brand.map((task, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{task.bName}</td>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No task available
              </td>
            </tr>
          )}
        </tbody>

      </table>

      <DeleteProductModal
        show={showModal}
        handleClose={handleCloseModal}
        handleDelete={handleDeleteCatagory}
        product={selectedProduct}
      />

      {/* Edit Modal */}
      {editingBrand && (
        <EditBrandForm
        show={!!editingBrand}  
          brand={editingBrand}
          onSave={handleUpdateBrand}
          onCancel={() => setEditingBrand(null)}
        />
      )}

      {/* Add Modal */}
      <AddBrandModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleAdd={handleAddBrand}
      />

    </div>
    
  );
};
export default Brand
