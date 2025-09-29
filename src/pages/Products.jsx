import React, { useEffect, useState } from "react";
import axios from "axios";
import { createProduct, deleteProduct, getAllBrands, getAllcat, getAllproducts, updateProuct } from "../api/Taskapi";
import DeleteProductModal from "../components/DeleteProductModal";
import EditProductModal from "../components/producteditadd/EditProductModal";
import AddProductModal from "../components/producteditadd/AddProductModal";



const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ pName: "", pdescription: "", Price: "", quntity: "" });

  // For modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [categorie, setCategorie] = useState([]);
  const [brand, setbrand] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);


  async function fetchData() {
    const response = await getAllproducts();
    if (response.data.success) {
      setProducts(response.data.products);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchCategories() {
    const res = await getAllcat();
    if (res.data.success) {
      setCategorie(res.data.catagoris);
    }
  }

  async function fetchBrands() {
    const res = await getAllBrands();
    if (res.data.success) {
      setbrand(res.data.brands);
    }
  }

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchBrands();
  }, []);



  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };


  async function handleDeleteProduct(id) {
    const response = await deleteProduct(id);
    if (response.data.success) {
      alert(response.data.msg)

    } else {
      alert("Error deleting product");
    }
    fetchData();
    handleCloseModal();
  }


  // const editProduct = (product) => {
  //   setEditingProduct(product.id);
  //   setForm(product);
  // };

  const editProduct = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditingProduct(null);
    setShowEditModal(false);
  };

  const handleUpdateProduct = async (id, form) => {
    const res = await updateProuct(id, form);
    if (res.data.success) {
      alert(res.data.msg);
      fetchData();
    } else {
      alert("Error updating product");
    }
    closeEditModal();
  };

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const handleAddProduct = async (form) => {
    const res = await createProduct(form);
    if (res.data.success) {
      alert(res.data.msg);
      fetchData();
    } else {
      alert("Error adding product");
    }
    closeAddModal();
  };

  return (
       <div className="p-6">
       <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products List</h2>
        <button className="bg-green-600 hover:bg-green-700 btn btn-primary font-medium px-5 py-2 rounded-lg shadow-md transition"  
        onClick={openAddModal}>
          + Add Brand
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Category</th>
              <th className="p-3 border-b">Brand</th>
              <th className="p-3 border-b">Quantity</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p , i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 transition border-b last:border-0"
              >
                <td className="p-3">{i+1}</td>
                <td className="p-3 font-medium">{p.pName}</td>
                <td className="p-3 text-gray-600">{p.pdescription}</td>
                <td className="p-3 text-green-600 font-semibold">
                  ${p.Price}
                </td>
                <td className="p-3">{p.Category?.cName || "N/A"}</td>
                <td className="p-3">{p.brand?.bName || "N/A"}</td>
                <td className="p-3">{p.quntity}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 btn btn-success px-3 py-1 rounded-md text-sm shadow"
                    onClick={() => editProduct(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 px-3 btn btn-danger py-1 rounded-md text-sm shadow"
                    onClick={() => openDeleteModal(p)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="p-6 text-center text-gray-500 italic"
                >
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteProductModal
        show={showModal}
        handleClose={handleCloseModal}
        handleDelete={handleDeleteProduct}
        product={selectedProduct}
      />

      {/* Edit Modal */}
      <EditProductModal
        show={showEditModal}
        product={editingProduct}
        categorie={categorie}
        brand={brand}
        onSave={handleUpdateProduct}
        onCancel={closeEditModal}
      />

      {/* Add Modal */}
      <AddProductModal
        show={showAddModal}
        onSave={handleAddProduct}
        onCancel={closeAddModal}
        categorie={categorie}
        brand={brand}
      />
    </div>
  );
};

export default Products;
