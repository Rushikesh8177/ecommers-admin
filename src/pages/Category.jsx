import React, { useEffect, useState } from 'react'
import { createcat, deletecat, getAllcat, updatecat } from '../api/Taskapi'
import DeleteProductModal from '../components/DeleteProductModal';
import EditCategoryForm from '../components/categoryeditadd/EditCategoryForm';
import AddCategoryModal from '../components/categoryeditadd/AddCategoryModal';

const Category = () => {

  const [categorie, setCategorie] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  async function fetchData() {
    const response = await getAllcat();
    console.log(response.data.catagoris);
    if (response.data.success) {
      setCategorie(response.data.catagoris);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteClick = (task) => {
    setSelectedProduct(task);
    setShowModal(true);
  }

  async function handleDeleteCatagory(id) {
    const response = await deletecat(id);
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

  const handleEditClick = (cat) => {
    setEditingCategory(cat);
  };

  const handleUpdateCategory = async (id, form) => {
    const response = await updatecat(id, form);
    if (response.data.success) {
      alert(response.data.msg);
      fetchData();
    } else {
      alert("Error updating category");
    }
    setEditingCategory(null);
  };

  // ADD
  const handleAddCategory = async (form) => {
    const response = await createcat(form);
    if (response.data.success) {
      alert(response.data.msg);
      fetchData();
    } else {
      alert("Error adding category");
    }
    setShowAddModal(false);
  };



  return (

    <div className="container ">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Category List</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          + Add Category
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">Task Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categorie.length > 0 ? (
            categorie.map((task, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{task.cName}</td>

                {/* <td><button onClick={() => handleIsComplete(task.id)}>{task.is_complete == 0 ? <span>In progress</span> : <span>Completed</span>}
                    </button></td> */}

                {/* <td>{task.start_date}</td>
                    <td>{task.end_date}</td> */}
                <td>
                  <button className="btn btn-success" onClick={() => handleEditClick(task)}>Edit</button>
                  <button
                    className="btn btn-danger"
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

      {/* Edit Form */}
      {editingCategory && (
        <EditCategoryForm
        show={!!editingCategory}
          category={editingCategory}
          onSave={handleUpdateCategory}
          onCancel={() => setEditingCategory(null)}
        />
      )}

      {/* Add Modal */}
      <AddCategoryModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleAdd={handleAddCategory}
      />

    </div>
  );
};

export default Category
