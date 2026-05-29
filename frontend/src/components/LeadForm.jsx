import { useEffect, useState } from "react";
import { LEAD_STATUSES } from "../utils/constants.js";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  status: "New"
};

const LeadForm = ({ editingLead, loading, onCancelEdit, onSubmit }) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingLead) {
      setFormData({
        name: editingLead.name,
        email: editingLead.email,
        phone: editingLead.phone,
        status: editingLead.status
      });
    } else {
      setFormData(initialForm);
    }
  }, [editingLead]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{editingLead ? "Edit lead" : "Add lead"}</h2>
        {editingLead && (
          <button className="ghost-button" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>

      <label>
        Name
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Aarav Sharma"
          required
        />
      </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="aarav@example.com"
          required
        />
      </label>

      <label>
        Phone
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98765 43210"
          required
        />
      </label>

      <label>
        Status
        <select name="status" value={formData.status} onChange={handleChange}>
          {LEAD_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? "Saving..." : editingLead ? "Update lead" : "Create lead"}
      </button>
    </form>
  );
};

export default LeadForm;
