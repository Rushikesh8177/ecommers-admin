import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";


const AddCategoryModal = ({ show, handleClose, handleAdd }) => {
  const [form, setForm] = useState({ cName: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.cName.trim()) return;
    handleAdd(form);
    setForm({ cName: "" });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              value={form.cName}
              onChange={(e) => setForm({ ...form, cName: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCategoryModal;
