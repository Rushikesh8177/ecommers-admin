import React, { useState, useEffect } from "react";

const EditCategoryForm = ({ category, onSave, onCancel }) => {
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
    <div className="card p-3 shadow-sm mt-4">
      <h5>Edit Category</h5>
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
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryForm;
