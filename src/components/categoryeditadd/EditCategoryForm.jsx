import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const EditCategoryModal = ({ show, category, onSave, onCancel }) => {
  const [form, setForm] = useState({ cName: "" });

  // Pre-fill form when category changes
  useEffect(() => {
    if (category) {
      setForm({ cName: category.cName });
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.cName.trim()) return;
    onSave(category.id, form);
  };

  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
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
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCategoryModal;
