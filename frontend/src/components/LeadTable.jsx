import { Edit, Trash2 } from "lucide-react";

const LeadTable = ({ leads, onDelete, onEdit }) => {
  if (!leads.length) {
    return (
      <div className="empty-state">
        <h2>No leads found</h2>
        <p>Add a new lead or change the status filter.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Created</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>
                <span className={`status-pill status-${lead.status.toLowerCase()}`}>
                  {lead.status}
                </span>
              </td>
              <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
              <td className="row-actions">
                <button
                  className="icon-button"
                  type="button"
                  onClick={() => onEdit(lead)}
                  title="Edit lead"
                  aria-label={`Edit ${lead.name}`}
                >
                  <Edit size={17} />
                </button>
                <button
                  className="icon-button danger"
                  type="button"
                  onClick={() => onDelete(lead._id)}
                  title="Delete lead"
                  aria-label={`Delete ${lead.name}`}
                >
                  <Trash2 size={17} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
