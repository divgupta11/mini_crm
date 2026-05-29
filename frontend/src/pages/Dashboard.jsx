import { LogOut, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api from "../api/axios.js";
import LeadForm from "../components/LeadForm.jsx";
import LeadTable from "../components/LeadTable.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { LEAD_STATUSES } from "../utils/constants.js";
import { getErrorMessage } from "../utils/getErrorMessage.js";

const Dashboard = () => {
  const { logout, user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [editingLead, setEditingLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const leadStats = useMemo(() => {
    return LEAD_STATUSES.map((status) => ({
      status,
      count: leads.filter((lead) => lead.status === status).length
    }));
  }, [leads]);

  const fetchLeads = async () => {
    setLoading(true);
    setError("");

    try {
      const query = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : "";
      const { data } = await api.get(`/leads${query}`);
      setLeads(data.leads);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleSubmitLead = async (payload) => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (editingLead) {
        await api.put(`/leads/${editingLead._id}`, payload);
        setSuccess("Lead updated successfully");
      } else {
        await api.post("/leads", payload);
        setSuccess("Lead created successfully");
      }

      setEditingLead(null);
      await fetchLeads();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLead = async (id) => {
    const confirmed = window.confirm("Delete this lead?");
    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await api.delete(`/leads/${id}`);
      setSuccess("Lead deleted successfully");
      await fetchLeads();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">Mini CRM</span>
          <h1>Lead Dashboard</h1>
          <p>{user?.name ? `Signed in as ${user.name}` : "Manage your sales leads"}</p>
        </div>
        <button className="secondary-button" type="button" onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <section className="stats-grid" aria-label="Lead status summary">
        {leadStats.map((item) => (
          <div className="stat-card" key={item.status}>
            <span>{item.status}</span>
            <strong>{item.count}</strong>
          </div>
        ))}
      </section>

      <section className="dashboard-grid">
        <LeadForm
          editingLead={editingLead}
          loading={saving}
          onCancelEdit={() => setEditingLead(null)}
          onSubmit={handleSubmitLead}
        />

        <div className="leads-panel">
          <div className="panel-toolbar">
            <div>
              <h2>Leads</h2>
              <p>{leads.length} lead{leads.length === 1 ? "" : "s"} shown</p>
            </div>
            <div className="filters">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter leads by status"
              >
                <option value="">All statuses</option>
                {LEAD_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                className="icon-button"
                type="button"
                onClick={fetchLeads}
                title="Refresh leads"
                aria-label="Refresh leads"
              >
                <RefreshCw size={17} />
              </button>
            </div>
          </div>

          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}
          {loading ? <div className="loading">Loading leads...</div> : (
            <LeadTable
              leads={leads}
              onDelete={handleDeleteLead}
              onEdit={setEditingLead}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
