import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const AddBrandModal = ({ show, handleClose, handleAdd }) => {
    const [form, setForm] = useState({ bName: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.bName.trim()) return;
        handleAdd(form);
        setForm({ bName: "" });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Brand</Modal.Title>
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

export default AddBrandModal;
