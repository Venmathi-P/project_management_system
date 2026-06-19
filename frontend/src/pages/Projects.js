import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);

  const [project_name, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const saveProject = async () => {
    try {
      if (editingId) {
        await API.put(`/projects/${editingId}`, {
          project_name,
          description,
          status,
          start_date,
          end_date,
        });

        alert("Project Updated");
      } else {
        await API.post("/projects", {
          project_name,
          description,
          status,
          start_date,
          end_date,
        });

        alert("Project Created");
      }

      clearForm();
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setProjectName("");
    setDescription("");
    setStatus("Pending");
    setStartDate("");
    setEndDate("");
  };

  const editProject = (project) => {
    setEditingId(project.id);
    setProjectName(project.project_name);
    setDescription(project.description);
    setStatus(project.status);
    setStartDate(project.start_date?.split("T")[0]);
    setEndDate(project.end_date?.split("T")[0]);
  };

  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.project_name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      project.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Navbar />

      <div className="page">

        <div className="add-panel">

          <div className="add-panel-title">
            {editingId
              ? "Edit Project"
              : "Create Project"}
          </div>

          <div className="form-group">
            <input
              placeholder="Project Name"
              value={project_name}
              onChange={(e) =>
                setProjectName(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div className="form-row">

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <input
              type="date"
              value={start_date}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
            />

          </div>

          <br />

          <input
            type="date"
            value={end_date}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
          />

          <br /><br />

          <button
            className="btn btn-primary"
            onClick={saveProject}
          >
            {editingId
              ? "Update Project"
              : "Add Project"}
          </button>

        </div>

        <div className="card">

          <input
            placeholder="Search Project..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <br /><br />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

        </div>

        <br />

        <div className="item-list">

          {filteredProjects.map((project) => (

            <div
              key={project.id}
              className="item-card"
            >
              <div className="item-card-body">

                <div className="item-name">
                  {project.project_name}
                </div>

                <div className="item-desc">
                  {project.description}
                </div>

                <span className="badge badge-progress">
                  {project.status}
                </span>

              </div>

              <div>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    editProject(project)
                  }
                >
                  Edit
                </button>

                {" "}

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    deleteProject(project.id)
                  }
                >
                  Delete
                </button>

              </div>
            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Projects;