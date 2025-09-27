import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteProduct, getAllproducts } from "../api/Taskapi";
import DeleteProductModal from "../components/DeleteProductModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ pName: "", pdescription: "", Price: "", quntity: "" });

  // For modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function fetchData() {
    const response = await getAllproducts();
    if (response.data.success) {
      setProducts(response.data.products);
    }
  }

  useEffect(() => {
    fetchData();
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
      
    }else{
      alert("Error deleting product");
    }
    fetchData();
    handleCloseModal();
  }
  

  const editProduct = (product) => {
    setEditingProduct(product.id);
    setForm(product);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-bold">Product List</h1>
      <table className="w-full border rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.pName}</td>
              <td className="p-2">{p.pdescription}</td>
              <td className="p-2">${p.Price}</td>
              <td className="p-2">{p.quntity}</td>
              <td className="p-2 space-x-2">
                <button
                  className="bg-blue-500 px-2 py-1 rounded"
                  onClick={() => editProduct(p)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 px-2 py-1 rounded"
                  onClick={() => openDeleteModal(p)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <DeleteProductModal
        show={showModal}
        handleClose={handleCloseModal}
        handleDelete={handleDeleteProduct}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
