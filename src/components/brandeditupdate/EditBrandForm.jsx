import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const EditBrandForm = ({ show, brand, onSave, onCancel }) => {
  const [form, setForm] = useState({ bName: "" });

  useEffect(() => {
    if (brand) {
      setForm({ bName: brand.bName });
    }
  }, [brand]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.bName.trim()) return;
    onSave(brand.id, form);
  };

  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Brand Name</label>
            <input
              type="text"
              className="form-control"
              value={form.bName}
              onChange={(e) => setForm({ ...form, bName: e.target.value })}
            />
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

export default EditBrandForm;
