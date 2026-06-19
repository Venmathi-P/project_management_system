import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const priorityBadge = (p) => {
  if (p === "High")   return <span className="badge badge-high">{p}</span>;
  if (p === "Medium") return <span className="badge badge-medium">{p}</span>;
  return <span className="badge badge-low">{p}</span>;
};

const statusBadge = (s) => {
  if (s === "Completed") return <span className="badge badge-completed">{s}</span>;
  return <span className="badge badge-pending">{s}</span>;
};

function Tasks() {
  const [tasks,       setTasks]       = useState([]);
  const [projects,    setProjects]    = useState([]);
  const [task_name,   setTaskName]    = useState("");
  const [description, setDescription] = useState("");
  const [priority,    setPriority]    = useState("Medium");
  const [status,      setStatus]      = useState("Pending");
  const [due_date,    setDueDate]     = useState("");
  const [project_id,  setProjectId]   = useState("");
  const [loading,     setLoading]     = useState(false);
  const [showForm,    setShowForm]    = useState(false);
  const [search, setSearch] = useState("");

const [editingId, setEditingId] = useState(null);
  const [filter,      setFilter]      = useState("All");

  useEffect(() => {
    fetchTasks();
    API.get("/projects").then((r) => setProjects(r.data)).catch(console.error);
  }, []);

  const fetchTasks = () =>
    API.get("/tasks").then((r) => setTasks(r.data)).catch(console.error);

  const addTask = async () => {
  if (!task_name.trim()) return;

  setLoading(true);

  try {

    if (editingId) {

      await API.put(`/tasks/${editingId}`, {
        task_name,
        description,
        priority,
        status,
        due_date,
      });

      alert("Task Updated");

    } else {

      await API.post("/tasks", {
        task_name,
        description,
        priority,
        status,
        due_date,
        project_id,
      });

      alert("Task Created");
    }

    setTaskName("");
    setDescription("");
    setPriority("Medium");
    setStatus("Pending");
    setDueDate("");
    setProjectId("");

    setEditingId(null);

    setShowForm(false);

    fetchTasks();

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Failed to save task."
    );

  } finally {
    setLoading(false);
  }
};

  const deleteTask = (id) =>
    API.delete(`/tasks/${id}`).then(fetchTasks).catch(console.error);
  const editTask = (task) => {

  setEditingId(task.id);

  setTaskName(task.task_name);

  setDescription(task.description);

  setPriority(task.priority);

  setStatus(task.status);

  setDueDate(
    task.due_date
      ? task.due_date.split("T")[0]
      : ""
  );

  setProjectId(task.project_id);

  setShowForm(true);
};

  const filtered = tasks.filter((task) => {

  const matchesSearch =
    task.task_name
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" ||
    task.status === filter;

  return matchesSearch && matchesFilter;
});

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-header">
          <h2 className="page-title">Tasks</h2>
          <button className="btn btn-success" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Cancel" : "+ New task"}
          </button>
        </div>

        {/* Add form */}
        {showForm && (
          <div className="add-panel">
            <div className="add-panel-title">New task</div>

            <div className="form-group">
              <label>Task Name *</label>
              <input
                type="text" placeholder="e.g. Design login screen"
                value={task_name}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Any notes or context…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Project</label>
                <select value={project_id} onChange={(e) => setProjectId(e.target.value)}>
                  <option value="">No project</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.project_name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input type="date" value={due_date} onChange={(e) => setDueDate(e.target.value)} />
              </div>
            </div>

            <button className="btn btn-success" onClick={addTask} disabled={loading}>
              {loading ? "Creating…" : "Create task"}
            </button>
          </div>
        )}
        <div className="form-group">

  <input
    type="text"
    placeholder="Search Tasks..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

</div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["All", "Pending", "Completed"].map((f) => (
            <button
              key={f}
              className="btn btn-sm"
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? "var(--indigo)" : "transparent",
                color: filter === f ? "#fff" : "var(--muted)",
                border: `1px solid ${filter === f ? "var(--indigo)" : "var(--border)"}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="section-header">
          <span className="section-title">Tasks</span>
          <span className="section-count">{filtered.length} shown</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">✅</div>
            <p>{filter === "All" ? "No tasks yet. Add your first one above." : `No ${filter.toLowerCase()} tasks.`}</p>
          </div>
        ) : (
          <div className="item-list">
            {filtered.map((t) => (
              <div key={t.id} className="item-card">
                <div className="item-card-body">
                  <div className="item-name">{t.task_name}</div>
                  {t.description && <div className="item-desc">{t.description}</div>}
                  <div className="item-meta">
                    {priorityBadge(t.priority)}
                    {statusBadge(t.status)}
                    {t.due_date && (
                      <span className="item-meta-text">
                        Due {new Date(t.due_date).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                      </span>
                    )}
                  </div>
                </div>
                <div
  style={{
    display: "flex",
    gap: "10px"
  }}
>

  <button
    className="btn btn-primary btn-sm"
    onClick={() => editTask(t)}
  >
    Edit
  </button>

  <button
    className="btn btn-danger btn-sm"
    onClick={() => deleteTask(t.id)}
  >
    Delete
  </button>

</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Tasks;
