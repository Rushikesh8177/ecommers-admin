import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const AddProductModal = ({ show, onSave, onCancel, categorie, brand }) => {
  const [form, setForm] = useState({
    pName: "",
    pdescription: "",
    Price: "",
    quntity: "",
    catID: "",
    brandID: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.pName.trim()) return;
    onSave(form);
    setForm({ pName: "", pdescription: "", Price: "", quntity: "", catID: "", brandID: "" }); // reset form
  };

  return (
    <Modal show={show} onHide={onCancel} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={form.pName}
              onChange={(e) => setForm({ ...form, pName: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={form.pdescription}
              onChange={(e) => setForm({ ...form, pdescription: e.target.value })}
            />
          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={form.Price}
              onChange={(e) => setForm({ ...form, Price: e.target.value })}
            />
          </div>

          {/* Quantity */}
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={form.quntity}
              onChange={(e) => setForm({ ...form, quntity: e.target.value })}
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              value={form.catID}
              onChange={(e) => setForm({ ...form, catID: e.target.value })}
            >
              <option value="">Select Category</option>
              {categorie.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.cName}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div className="mb-3">
            <label className="form-label">Brand</label>
            <select
              className="form-control"
              value={form.brandID}
              onChange={(e) => setForm({ ...form, brandID: e.target.value })}
            >
              <option value="">Select Brand</option>
              {brand.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.bName}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
